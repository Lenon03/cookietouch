import LanguageManager from "@/configurations/language/LanguageManager";
import SpellEntry from "@/game/character/SpellEntry";
import Account from "@account";
import Button from "@material-ui/core/Button";
import withStyles, { StyleRulesCallback, WithStyles } from "@material-ui/core/styles/withStyles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import * as React from "react";

type style = "root" | "table";

const styles: StyleRulesCallback<style> = (theme) => ({
  root: {
    borderCollapse: "collapse",
    flexGrow: 1,
    maxHeight: 900,
    overflowY: "auto",
    padding: 10,
  },
  table: {
    minWidth: 700,
  },
});

interface IProps {
  account: Account;
}

interface IState {
  spells: SpellEntry[];
  spellsPoints: number;
}

type Props = IProps & WithStyles<style>;

class Spells extends React.Component<Props, IState> {

  public state: IState = {
    spells: [],
    spellsPoints: -1,
  };

  public componentDidMount() {
    this.props.account.game.character.SpellsUpdated.on(this.spellsUpdated);
    this.props.account.game.character.StatsUpdated.on(this.statsUpdated);
  }

  public componentWillUnmount() {
    this.props.account.game.character.SpellsUpdated.off(this.spellsUpdated);
    this.props.account.game.character.StatsUpdated.off(this.statsUpdated);
  }

  public render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <h4>{LanguageManager.trans("spellsPoints", this.state.spellsPoints)}</h4>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell numeric>ID</TableCell>
              <TableCell>{LanguageManager.trans("name")}</TableCell>
              <TableCell numeric>{LanguageManager.trans("level")}</TableCell>
              <TableCell>{LanguageManager.trans("up")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.spells.map((s, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>
                    <img width="40" height="40" src={s.iconUrl} alt={s.name} />
                  </TableCell>
                  <TableCell numeric>{s.id}</TableCell>
                  <TableCell>{s.name}</TableCell>
                  <TableCell numeric>{s.level}</TableCell>
                  <TableCell>
                    <Button variant="raised"
                      size="small"
                      color="primary"
                      disabled={this.state.spellsPoints > 0 ? this.state.spellsPoints < s.level : true}
                      onClick={() => this.props.account.game.character.levelUpSpell(s)}
                    >
                      {LanguageManager.trans("up")}
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    );
  }

  private statsUpdated = () => {
    this.setState({ spellsPoints: this.props.account.game.character.stats.spellsPoints });
  }

  private spellsUpdated = () => {
    this.setState({ spells: this.props.account.game.character.spells });
  }
}

export default withStyles(styles)<IProps>(Spells);
