import Account from "@/account";
import LanguageManager from "@/configurations/language/LanguageManager";
import LinearProgress from "@material-ui/core/LinearProgress";
import withStyles from "@material-ui/core/styles/withStyles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Tooltip from "@material-ui/core/Tooltip";
import { characterJobsTabStyles } from "@renderer/pages/tabs/Character/Jobs/styles";
import {
  CharacterJobsTabProps,
  ICharacterJobsTabProps,
  ICharacterJobsTabState
} from "@renderer/pages/tabs/Character/Jobs/types";
import * as React from "react";

class Jobs extends React.Component<
  CharacterJobsTabProps,
  ICharacterJobsTabState
> {
  public state: ICharacterJobsTabState = {
    jobs: []
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
              <TableCell />
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
                    <Tooltip
                      title={`${j.experience} / ${j.experienceNextLevelFloor}`}
                    >
                      <LinearProgress
                        style={{ height: 16, marginLeft: "20px" }}
                        variant="determinate"
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
    this.setState({
      jobs: this.props.account.game.character.jobs.jobs.ToArray()
    });
  };
}

export default withStyles(characterJobsTabStyles)<ICharacterJobsTabProps>(Jobs);
