import LanguageManager from "@/configurations/language/LanguageManager";
import ObjectObtainedEntry from "@/statistics/ObjectObtainedEntry";
import { displayTime } from "@/utils/Time";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";
import withStyles from "@material-ui/core/styles/withStyles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  IStatisticsTabProps,
  IStatisticsTabState,
  statisticsTabStyles
} from "@renderer/pages/tabs/Statistics/types";
import * as React from "react";

class Statistics extends React.Component<
  IStatisticsTabProps,
  IStatisticsTabState
> {
  public state: IStatisticsTabState = {
    achievementsFinished: 0,
    averageFightTime: 0,
    experienceGained: 0,
    fightsCount: 0,
    fightsLost: 0,
    fightsWon: 0,
    gathersCount: 0,
    kamasGained: 0,
    levelsGained: 0,
    objectsObtainedInFights: [],
    objectsObtainedInGathers: [],
    totalFightsTime: 0,
    totalGathersTime: 0
  };

  public componentDidMount() {
    this.props.account.statistics.StatisticsUpdated.on(this.statisticsUpdated);
  }

  public componentWillUnmount() {
    this.props.account.statistics.StatisticsUpdated.off(this.statisticsUpdated);
  }

  public render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>
              {LanguageManager.trans("statsFight")}
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              {LanguageManager.trans("fightsCount")} {this.state.fightsCount}
              <br />
              {LanguageManager.trans("fightsLost")} {this.state.fightsLost}
              <br />
              {LanguageManager.trans("fightsWon")} {this.state.fightsWon}
              <br />
              {LanguageManager.trans("averageFightTime")}{" "}
              {displayTime(this.state.averageFightTime)}
              <br />
              {LanguageManager.trans("totalFightsTime")}{" "}
              {displayTime(this.state.totalFightsTime)}
            </Typography>
          </ExpansionPanelDetails>
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>
                {LanguageManager.trans("statsFightRessource")}
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Grid container={true} spacing={0} alignItems={"flex-start"}>
                <Grid item={true} xs={12}>
                  <Table className={classes.table}>
                    <TableHead>
                      <TableRow>
                        <TableCell numeric={true}>GID</TableCell>
                        <TableCell>{LanguageManager.trans("name")}</TableCell>
                        <TableCell numeric={true}>%</TableCell>
                        <TableCell numeric={true}>
                          {LanguageManager.trans("quantity")}
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {this.state.objectsObtainedInFights.map((o, index) => {
                        return (
                          <TableRow key={index}>
                            <TableCell numeric={true}>{o.gid}</TableCell>
                            <TableCell>{o.name}</TableCell>
                            <TableCell>
                              <Typography>
                                {o.percentage.toFixed(2)}%
                              </Typography>
                              <LinearProgress
                                style={{ height: 16 }}
                                variant="determinate"
                                value={o.percentage}
                              />
                            </TableCell>
                            <TableCell numeric={true}>{o.quantity}</TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </Grid>
              </Grid>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>
              {LanguageManager.trans("statsGather")}
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              {LanguageManager.trans("gathersCount")} {this.state.gathersCount}
              <br />
              {LanguageManager.trans("totalGathersTime")}{" "}
              {displayTime(this.state.totalGathersTime)}
            </Typography>
          </ExpansionPanelDetails>
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>
                {LanguageManager.trans("statsGatherRessource")}
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Grid container={true} spacing={0} alignItems={"flex-start"}>
                <Grid item={true} xs={12}>
                  <Table className={classes.table}>
                    <TableHead>
                      <TableRow>
                        <TableCell numeric={true}>GID</TableCell>
                        <TableCell>{LanguageManager.trans("name")}</TableCell>
                        <TableCell numeric={true}>%</TableCell>
                        <TableCell numeric={true}>
                          {LanguageManager.trans("quantity")}
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {this.state.objectsObtainedInGathers.map((o, index) => {
                        return (
                          <TableRow key={index}>
                            <TableCell numeric={true}>{o.gid}</TableCell>
                            <TableCell>{o.name}</TableCell>
                            <TableCell>
                              <Typography>
                                {o.percentage.toFixed(2)}%
                              </Typography>
                              <LinearProgress
                                style={{ height: 16 }}
                                variant="determinate"
                                value={o.percentage}
                              />
                            </TableCell>
                            <TableCell numeric={true}>{o.quantity}</TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </Grid>
              </Grid>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>
              {LanguageManager.trans("statsOther")}
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              {LanguageManager.trans("levelsGained")} {this.state.levelsGained}
              <br />
              {LanguageManager.trans("experienceGained")}{" "}
              {this.state.experienceGained}
              <br />
              {LanguageManager.trans("kamasGained") + ":"}{" "}
              {this.state.kamasGained}
              <br />
              {LanguageManager.trans("achievementsFinished")}{" "}
              {this.state.achievementsFinished}
              <br />
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }

  private statisticsUpdated = () => {
    this.setState({
      achievementsFinished: this.props.account.statistics.achievementsFinished,
      averageFightTime: this.props.account.statistics.averageFightTime,
      experienceGained: this.props.account.statistics.experienceGained,
      fightsCount: this.props.account.statistics.fightsCount,
      fightsLost: this.props.account.statistics.fightsLost,
      fightsWon: this.props.account.statistics.fightsWon,
      gathersCount: this.props.account.statistics.gathersCount,
      kamasGained: this.props.account.statistics.kamasGained,
      levelsGained: this.props.account.statistics.levelsGained,
      objectsObtainedInFights: this.props.account.statistics.objectsObtainedInFights
        .ToArray()
        .sort(this.sortObjects),
      objectsObtainedInGathers: this.props.account.statistics.objectsObtainedInGathers
        .ToArray()
        .sort(this.sortObjects),
      totalFightsTime: this.props.account.statistics.totalFightsTime,
      totalGathersTime: this.props.account.statistics.totalGathersTime
    });
  };

  private sortObjects = (a: ObjectObtainedEntry, b: ObjectObtainedEntry) => {
    return b.percentage - a.percentage;
  };
}

export default withStyles(statisticsTabStyles)(Statistics);
