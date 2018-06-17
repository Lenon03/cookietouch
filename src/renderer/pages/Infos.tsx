import { AccountStates } from "@/account/AccountStates";
import GlobalConfiguration from "@/configurations/GlobalConfiguration";
import LanguageManager from "@/configurations/language/LanguageManager";
import Account from "@account";
import { faKorvue } from "@fortawesome/fontawesome-free-brands";
import { faBolt, faBriefcase, faGem, faHeart, faStar } from "@fortawesome/fontawesome-free-solid";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";
import Paper from "@material-ui/core/Paper";
import withStyles, { StyleRulesCallback, WithStyles } from "@material-ui/core/styles/withStyles";
import Tooltip from "@material-ui/core/Tooltip";
import CookieMain from "@renderer/CookieMain";
import { remote } from "electron";
import * as React from "react";

type style = "root" | "paper" | "icon";

const styles: StyleRulesCallback<style> = (theme) => ({
  icon: {
    color: theme.palette.primary.main,
  },
  paper: {
    color: theme.palette.text.secondary,
    margin: theme.spacing.unit,
    padding: theme.spacing.unit * 2,
  },
  root: {
    flexGrow: 1,
  },
});

interface IProps {
  account: Account;
}

interface IState {
  energyPoints: number;
  energyPointsMax: number;
  experience: number;
  experienceMax: number;
  experiencePercent: number;
  kamas: number;
  lifePoints: number;
  lifePointsMax: number;
  position: string;
  scriptLoaded: boolean;
  scriptName: string;
  status: AccountStates;
  weight: number;
  weightMax: number;
  goultines: number;
  bonuspack: string;
}

type Props = IProps & WithStyles<style>;

class Infos extends React.Component<Props, IState> {

  public readonly idleState: IState = {
    bonuspack: "",
    energyPoints: -1,
    energyPointsMax: -1,
    experience: -1,
    experienceMax: -1,
    experiencePercent: -1,
    goultines: -1,
    kamas: -1,
    lifePoints: -1,
    lifePointsMax: -1,
    position: "",
    scriptLoaded: false,
    scriptName: "",
    status: AccountStates.DISCONNECTED,
    weight: -1,
    weightMax: -1,
  };

  public state: IState = this.idleState;

  public componentDidMount() {
    this.props.account.game.character.StatsUpdated.on(this.statsUpdated);
    this.props.account.game.fight.FighterStatsUpdated.on(this.fighterStatsUpdated);
    this.props.account.StateChanged.on(this.stateChanged);
    this.props.account.game.map.MapChanged.on(this.mapChanged);
    this.props.account.game.character.inventory.InventoryUpdated.on(this.inventoryUpdated);
    this.props.account.scripts.ScriptLoaded.on(this.scriptLoaded);
    this.props.account.data.GoultinesUpdated.on(this.goultinesUpdated);
  }

  public componentWillUnmount() {
    this.props.account.game.character.StatsUpdated.off(this.statsUpdated);
    this.props.account.game.fight.FighterStatsUpdated.off(this.fighterStatsUpdated);
    this.props.account.StateChanged.off(this.stateChanged);
    this.props.account.game.map.MapChanged.off(this.mapChanged);
    this.props.account.game.character.inventory.InventoryUpdated.off(this.inventoryUpdated);
    this.props.account.scripts.ScriptLoaded.off(this.scriptLoaded);
    this.props.account.data.GoultinesUpdated.off(this.goultinesUpdated);
  }

  public render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        {/* <Paper className={classes.paper}> */}
          <Paper className={classes.paper}>
            <Grid container spacing={0}>
              <Grid item xs={2}>
                {/* <Switch
                checked={this.props.account.network.connected}
                onChange={() => { this.props.account.network.connected ? this.stop() : this.start(); }}
              />
              {this.props.account.network.connected ? LanguageManager.trans("disconnect") : LanguageManager.trans("connect")} */}
                <Button size="small" variant="raised" onClick={() => {
                  if (this.props.account.network.connected) {
                    this.stop();
                    this.props.account.planificationTimer.stop();
                  } else {
                    this.start();
                  }
                }} color="primary">
                  {this.props.account.network.connected ? LanguageManager.trans("disconnect") : LanguageManager.trans("connect")}
                </Button>
              </Grid>
              <Grid item xs={9}>
                Script: {this.state.scriptName}
                <Button size="small" variant="raised" style={{
                  marginLeft: "15px",
                }} onClick={() => {
                  remote.dialog.showOpenDialog({
                    filters: [
                      { name: "Cookie Scripts Format", extensions: ["js"] },
                    ],
                    properties: ["openFile"],
                  }, (filepaths) => {
                    const filepath = filepaths[0];
                    this.props.account.scripts.fromFile(filepath);
                  });
                }} color="primary">
                  {LanguageManager.trans("load")}
                </Button>
                <Button size="small" disabled={this.state.scriptLoaded ? false : true} variant="raised" onClick={this.launchScript} color="primary">
                  {LanguageManager.trans("play")}
                </Button>
                <Button size="small" disabled={this.state.scriptLoaded ? false : true} variant="raised" onClick={this.pauseScript} color="primary">
                  {LanguageManager.trans("pause")}
                </Button>
              </Grid>
              <Grid item xs={1}>
                <Button
                  disabled={this.props.account.hasGroup && !this.props.account.isGroupChief}
                  size="small"
                  variant="raised"
                  onClick={this.removeSelectedAccount}
                  color="secondary">
                  {LanguageManager.trans("remove")}
                </Button>
              </Grid>
            </Grid>
          </Paper>
          <Paper className={classes.paper}>
            <Grid container spacing={0}>
              <Grid item xs={4}>
                {this.state.position}
              </Grid>
              <Grid item xs={4}>
                {this.state.bonuspack}
              </Grid>
              <Grid item xs={4}>
                <span style={{ float: "right" }}>Status: {AccountStates[this.state.status]}</span>
              </Grid>
            </Grid>
          </Paper>
          <Paper className={classes.paper}>
            <Grid container spacing={8}>
              <Grid item xs={2}>
                <FontAwesomeIcon className={classes.icon} size="lg" icon={faHeart} />
                {(this.state.lifePoints !== -1 ? this.state.lifePoints / this.state.lifePointsMax * 100 : 0).toFixed(2)}%
                <Tooltip title={`${this.state.lifePoints} / ${this.state.lifePointsMax}`}>
                  <LinearProgress style={{ height: 16, marginLeft: "20px" }} variant="determinate"
                    value={this.state.lifePoints !== -1 ? this.state.lifePoints / this.state.lifePointsMax * 100 : 0}
                  />
                </Tooltip>
              </Grid>
              <Grid item xs={2}>
                <FontAwesomeIcon className={classes.icon} size="lg" icon={faBriefcase} />
                {(this.state.weight !== -1 ? this.state.weight / this.state.weightMax * 100 : 0).toFixed(2)}%
                <Tooltip title={`${this.state.weight} / ${this.state.weightMax}`}>
                  <LinearProgress style={{ height: 16, marginLeft: "20px" }} variant="determinate"
                    value={this.state.weight !== -1 ? this.state.weight / this.state.weightMax * 100 : 0}
                  />
                </Tooltip>
              </Grid>
              <Grid item xs={2}>
                <FontAwesomeIcon className={classes.icon} size="lg" icon={faStar} />
                {(this.state.experiencePercent !== -1 ? this.state.experiencePercent : 0).toFixed(2)}%
                <Tooltip title={`${this.state.experience} / ${this.state.experienceMax}`}>
                  <LinearProgress style={{ height: 16, marginLeft: "20px" }} variant="determinate"
                    value={this.state.experiencePercent !== -1 ? this.state.experiencePercent : 0}
                  />
                </Tooltip>
              </Grid>
              <Grid item xs={2}>
                <FontAwesomeIcon className={classes.icon} size="lg" icon={faBolt} />
                {(this.state.energyPoints !== -1 ? this.state.energyPoints / this.state.energyPointsMax * 100 : 0).toFixed(2)}%
                <Tooltip title={`${this.state.energyPoints} / ${this.state.energyPointsMax}`}>
                  <LinearProgress style={{ height: 16, marginLeft: "20px" }} variant="determinate"
                    value={this.state.energyPoints !== -1 ? this.state.energyPoints / this.state.energyPointsMax * 100 : 0}
                  />
                </Tooltip>
              </Grid>
              <Grid item xs={2}>
                <FontAwesomeIcon className={classes.icon} size="lg" icon={faKorvue} />
                {" "}{this.state.kamas}
              </Grid>
              <Grid item xs={2}>
                <FontAwesomeIcon className={classes.icon} size="lg" icon={faGem} />
                {" "}{this.state.goultines}
              </Grid>
            </Grid>
          </Paper>
        {/* </Paper> */}
      </div>
    );
  }

  private launchScript = () => {
    this.props.account.scripts.startScript();
  }

  private pauseScript = () => {
    this.props.account.scripts.stopScript(LanguageManager.trans("userStopScript"));
  }

  private removeSelectedAccount = () => {
    CookieMain.removeSelectedAccount();
  }

  private scriptLoaded = (scriptName: string) => {
    this.setState({
      scriptLoaded: true,
      scriptName,
    });
  }

  private start = () => {
    this.props.account.start();
  }

  private stop = () => {
    this.props.account.stop();
    this.setState(this.idleState);
  }

  private mapChanged = () => {
    this.setState({
      position: `${this.props.account.game.map.labelPosition} (${this.props.account.game.map.id})`,
    });
  }

  private stateChanged = () => {
    this.setState({ status: this.props.account.state });
  }

  private statsUpdated = () => {
    this.setState({
      energyPoints: this.props.account.game.character.stats.energyPoints,
      energyPointsMax: this.props.account.game.character.stats.maxEnergyPoints,
      experience: this.props.account.game.character.stats.experience,
      experienceMax: this.props.account.game.character.stats.experienceNextLevelFloor,
      experiencePercent: this.props.account.game.character.stats.experiencePercent,
      lifePoints: this.props.account.game.character.stats.lifePoints,
      lifePointsMax: this.props.account.game.character.stats.maxLifePoints,
    });
  }

  private fighterStatsUpdated = () => {
    this.setState({
      energyPoints: this.props.account.game.character.stats.energyPoints,
      energyPointsMax: this.props.account.game.character.stats.maxEnergyPoints,
      experience: this.props.account.game.character.stats.experience,
      experienceMax: this.props.account.game.character.stats.experienceNextLevelFloor,
      experiencePercent: this.props.account.game.character.stats.experiencePercent,
      lifePoints: this.props.account.game.character.stats.lifePoints,
      lifePointsMax: this.props.account.game.character.stats.maxLifePoints,
    });
  }

  private inventoryUpdated = () => {
    this.setState({
      kamas: this.props.account.game.character.inventory.kamas,
      weight: this.props.account.game.character.inventory.weight,
      weightMax: this.props.account.game.character.inventory.weightMax,
    });
  }

  private goultinesUpdated = () => {
    this.setState({
      bonuspack: this.props.account.data.isSubscriber ?
        `${LanguageManager.trans("subscriber", this.props.account.data.subscriptionEndDate.toLocaleString(GlobalConfiguration.lang))}`
        : LanguageManager.trans("nosubscriber"),
      goultines: this.props.account.data.goultines,
    });
  }
}

export default withStyles(styles)<IProps>(Infos);
