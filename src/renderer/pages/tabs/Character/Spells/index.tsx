import LanguageManager from "@/configurations/language/LanguageManager";
import SpellEntry from "@/game/character/SpellEntry";
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import {
  characterSpellsTabStyles,
  ICharacterSpellsTabProps,
  ICharacterSpellsTabState
} from "@renderer/pages/tabs/Character/Spells/types";
import * as React from "react";

class Spells extends React.Component<
  ICharacterSpellsTabProps,
  ICharacterSpellsTabState
> {
  public state: ICharacterSpellsTabState = {
    spells: [],
    spellsPoints: -1
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
        <Typography variant="headline">
          {LanguageManager.trans("spellsPoints", this.state.spellsPoints)}
        </Typography>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell numeric={true}>ID</TableCell>
              <TableCell>{LanguageManager.trans("name")}</TableCell>
              <TableCell numeric={true}>
                {LanguageManager.trans("level")}
              </TableCell>
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
                  <TableCell numeric={true}>{s.id}</TableCell>
                  <TableCell>{s.name}</TableCell>
                  <TableCell numeric={true}>{s.level}</TableCell>
                  <TableCell>
                    <Button
                      variant="raised"
                      size="small"
                      color="primary"
                      disabled={
                        this.state.spellsPoints > 0
                          ? this.state.spellsPoints < s.level
                          : true
                      }
                      onClick={this.levelUpSpell(s)}
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

  private levelUpSpell = (spell: SpellEntry) => () => {
    this.props.account.game.character.levelUpSpell(spell);
  };

  private statsUpdated = () => {
    this.setState({
      spellsPoints: this.props.account.game.character.stats.spellsPoints
    });
  };

  private spellsUpdated = () => {
    this.setState({ spells: this.props.account.game.character.spells });
  };
}

export default withStyles(characterSpellsTabStyles)(Spells);
