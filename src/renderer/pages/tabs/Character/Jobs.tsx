import LanguageManager from "@/configurations/language/LanguageManager";
import JobEntry from "@/game/character/jobs/JobEntry";
import Account from "@account";
import LinearProgress from "@material-ui/core/LinearProgress";
import withStyles, { StyleRulesCallback, WithStyles } from "@material-ui/core/styles/withStyles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Tooltip from "@material-ui/core/Tooltip";
import * as React from "react";

type style = "root" | "table";

const styles: StyleRulesCallback<style> = (theme) => ({
  root: {
    flexGrow: 1,
    maxHeight: 400,
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
  jobs: JobEntry[];
}

type Props = IProps & WithStyles<style>;

class Jobs extends React.Component<Props, IState> {

  public state: IState = {
    jobs: [],
  };

  public componentDidMount() {
    this.props.account.game.character.jobs.JobsUpdated.on(this.jobsUpdated);
  }

  public componentWillUnmount() {
    this.props.account.game.character.jobs.JobsUpdated.off(this.jobsUpdated);
  }

  public render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell numeric>ID</TableCell>
              <TableCell>{LanguageManager.trans("name")}</TableCell>
              <TableCell numeric>{LanguageManager.trans("level")}</TableCell>
              <TableCell>XP</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.jobs.map((j, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>
                    <img width="40" height="40" src={j.iconUrl} alt={j.name} />
                  </TableCell>
                  <TableCell numeric>{j.id}</TableCell>
                  <TableCell>{j.name}</TableCell>
                  <TableCell numeric>{j.level}</TableCell>
                  <TableCell>
                  <Tooltip title={`${j.experience} / ${j.experienceNextLevelFloor}`}>
                  <LinearProgress style={{ height: 16, marginLeft: "20px" }} variant="determinate"
                    value={j.experiencePercent}
                  />
                </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    );
  }

  private jobsUpdated = () => {
    this.setState({ jobs: this.props.account.game.character.jobs.jobs.ToArray() });
  }
}

export default withStyles(styles)<IProps>(Jobs);
