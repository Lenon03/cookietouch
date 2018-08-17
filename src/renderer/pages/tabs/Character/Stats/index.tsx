import LanguageManager from "@/configurations/language/LanguageManager";
import { BoostableStats } from "@/game/character/BoostableStats";
import CharacterBaseCharacteristic from "@/protocol/network/types/CharacterBaseCharacteristic";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import { characterStatsTabStyles } from "@renderer/pages/tabs/Character/Stats/styles";
import {
  CharacterStatsTabProps,
  ICharacterStatsTabProps,
  ICharacterStatsTabState
} from "@renderer/pages/tabs/Character/Stats/types";
import * as React from "react";

class Stats extends React.Component<
  CharacterStatsTabProps,
  ICharacterStatsTabState
> {
  public state: ICharacterStatsTabState = {
    actionPoints: -1,
    agility: -1,
    chance: -1,
    initiative: -1,
    intelligence: -1,
    level: -1,
    lifePoints: -1,
    maxLifePoints: -1,
    movementPoints: -1,
    prospecting: -1,
    range: -1,
    skinUrl: "",
    statsPoints: -1,
    strength: -1,
    summonableCreaturesBoost: -1,
    vitality: -1,
    wisdom: -1
  };

  public componentDidMount() {
    this.props.account.game.character.CharacterSelected.on(
      this.characterSelected
    );
    this.props.account.game.character.StatsUpdated.on(this.statsUpdated);
  }

  public componentWillUnmount() {
    this.props.account.game.character.CharacterSelected.off(
      this.characterSelected
    );
    this.props.account.game.character.StatsUpdated.off(this.statsUpdated);
  }

  public render() {
    const { account, classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container={true} spacing={16}>
          <Grid item={true} xs={4}>
            <Typography variant="title">
              {account.game.character.name} ({account.game.character.id})
            </Typography>
            <Typography variant="subheading">
              {LanguageManager.trans("level")} {this.state.level}
            </Typography>
            <img src={this.state.skinUrl} alt="character" />
          </Grid>
          <Grid item={true} xs={4}>
            <Card className={classes.card}>
              <Typography variant="headline">
                {LanguageManager.trans("summary")}
              </Typography>
              <div className={classes.lineStats}>
                <img
                  className={classes.iconStats}
                  style={{ marginTop: -4 }}
                  src={require("@renderer/img/starYellow.png")}
                  alt=""
                />
                <div className={classes.labelStats}>
                  <Typography variant="body1">
                    {LanguageManager.trans("actionPoints")}
                  </Typography>
                </div>
                <span className={classes.statsLabelSpan}>
                  <Typography variant="body1">
                    {this.state.actionPoints}
                  </Typography>
                </span>
              </div>
              <div className={classes.lineStats}>
                <img
                  className={classes.iconStats}
                  src={require("@renderer/img/movement.png")}
                  alt=""
                />
                <div className={classes.labelStats}>
                  <Typography variant="body1">
                    {LanguageManager.trans("movementPoints")}
                  </Typography>
                </div>
                <span className={classes.statsLabelSpan}>
                  <Typography variant="body1">
                    {this.state.movementPoints}
                  </Typography>
                </span>
              </div>
              <div className={classes.lineStats}>
                <img
                  className={classes.iconStats}
                  src={require("@renderer/img/initiative.png")}
                  alt=""
                />
                <div className={classes.labelStats}>
                  <Typography variant="body1">Initiative</Typography>
                </div>
                <span className={classes.statsLabelSpan}>
                  <Typography variant="body1">
                    {this.state.initiative}
                  </Typography>
                </span>
              </div>

              <div className={classes.lineStats}>
                <img
                  className={classes.iconStats}
                  src={require("@renderer/img/prospecting.png")}
                  alt=""
                />
                <div className={classes.labelStats}>
                  <Typography variant="body1">
                    {LanguageManager.trans("prospecting")}
                  </Typography>
                </div>
                <span className={classes.statsLabelSpan}>
                  <Typography variant="body1">
                    {this.state.prospecting}
                  </Typography>
                </span>
              </div>

              <div className={classes.lineStats}>
                <img
                  className={classes.iconStats}
                  src={require("@renderer/img/range.png")}
                  alt=""
                />
                <div className={classes.labelStats}>
                  <Typography variant="body1">
                    {LanguageManager.trans("range")}
                  </Typography>
                </div>
                <span className={classes.statsLabelSpan}>
                  <Typography variant="body1">{this.state.range}</Typography>
                </span>
              </div>

              <div className={classes.lineStats}>
                <img
                  className={classes.iconStats}
                  src={require("@renderer/img/summon.png")}
                  alt=""
                />
                <div className={classes.labelStats}>
                  <Typography variant="body1">
                    {LanguageManager.trans("summons")}
                  </Typography>
                </div>
                <span className={classes.statsLabelSpan}>
                  <Typography variant="body1">
                    {this.state.summonableCreaturesBoost}
                  </Typography>
                </span>
              </div>
            </Card>
          </Grid>
          <Grid item={true} xs={4}>
            <Card className={classes.card}>
              <Typography variant="headline">
                {LanguageManager.trans("stats")}
              </Typography>
              <div className={classes.lineStats}>
                <img
                  className={classes.iconStats}
                  src={require("@renderer/img/vitality.png")}
                  alt=""
                />
                <div className={classes.labelStats}>
                  <Typography variant="body1">
                    {LanguageManager.trans("vitality")}
                  </Typography>
                </div>
                <Typography variant="body1">{this.state.vitality}</Typography>
                <span className={classes.statsLabelSpanAdd}>
                  <Button
                    variant="fab"
                    mini={true}
                    color="primary"
                    disabled={this.state.statsPoints <= 0}
                    onClick={this.boostStat(BoostableStats.VITALITY)}
                  >
                    +
                  </Button>
                </span>
              </div>

              <div className={classes.lineStats}>
                <img
                  className={classes.iconStats}
                  src={require("@renderer/img/wisdom.png")}
                  alt=""
                />
                <div className={classes.labelStats}>
                  <Typography variant="body1">
                    {LanguageManager.trans("wisdom")}
                  </Typography>
                </div>

                <Typography variant="body1">{this.state.wisdom}</Typography>
                <span className={classes.statsLabelSpanAdd}>
                  <Button
                    variant="fab"
                    mini={true}
                    color="primary"
                    disabled={this.state.statsPoints <= 0}
                    onClick={this.boostStat(BoostableStats.WISDOM)}
                  >
                    +
                  </Button>
                </span>
              </div>

              <div className={classes.lineStats}>
                <img
                  className={classes.iconStats}
                  src={require("@renderer/img/strength.png")}
                  alt=""
                />
                <div className={classes.labelStats}>
                  <Typography variant="body1">
                    {LanguageManager.trans("strength")}
                  </Typography>
                </div>

                <Typography variant="body1">{this.state.strength}</Typography>
                <span className={classes.statsLabelSpanAdd}>
                  <Button
                    variant="fab"
                    mini={true}
                    color="primary"
                    disabled={this.state.statsPoints <= 0}
                    onClick={this.boostStat(BoostableStats.STRENGTH)}
                  >
                    +
                  </Button>
                </span>
              </div>

              <div className={classes.lineStats}>
                <img
                  className={classes.iconStats}
                  src={require("@renderer/img/intelligence.png")}
                  alt=""
                />
                <div className={classes.labelStats}>
                  <Typography variant="body1">
                    {LanguageManager.trans("intelligence")}
                  </Typography>
                </div>
                <Typography variant="body1">
                  {this.state.intelligence}
                </Typography>
                <span className={classes.statsLabelSpanAdd}>
                  <Button
                    variant="fab"
                    mini={true}
                    color="primary"
                    disabled={this.state.statsPoints <= 0}
                    onClick={this.boostStat(BoostableStats.INTELLIGENCE)}
                  >
                    +
                  </Button>
                </span>
              </div>

              <div className={classes.lineStats}>
                <img
                  className={classes.iconStats}
                  src={require("@renderer/img/chance.png")}
                  alt=""
                />
                <div className={classes.labelStats}>
                  <Typography variant="body1">
                    {LanguageManager.trans("chance")}
                  </Typography>
                </div>

                <Typography variant="body1">{this.state.chance}</Typography>
                <span className={classes.statsLabelSpanAdd}>
                  <Button
                    variant="fab"
                    mini={true}
                    color="primary"
                    disabled={this.state.statsPoints <= 0}
                    onClick={this.boostStat(BoostableStats.CHANCE)}
                  >
                    +
                  </Button>
                </span>
              </div>

              <div className={classes.lineStats}>
                <img
                  className={classes.iconStats}
                  src={require("@renderer/img/agility.png")}
                  alt=""
                />
                <div className={classes.labelStats}>
                  <Typography variant="body1">
                    {LanguageManager.trans("agility")}
                  </Typography>
                </div>

                <Typography variant="body1">{this.state.agility}</Typography>
                <span className={classes.statsLabelSpanAdd}>
                  <Button
                    variant="fab"
                    mini={true}
                    color="primary"
                    disabled={this.state.statsPoints <= 0}
                    onClick={this.boostStat(BoostableStats.AGILITY)}
                  >
                    +
                  </Button>
                </span>
              </div>
            </Card>
            <div className={classes.labelPointsStats}>
              <Typography variant="body1">
                {LanguageManager.trans("points")}
              </Typography>
              <span
                style={{ marginRight: 56 }}
                className={classes.statsLabelSpanAdd}
              >
                <Typography variant="body1">
                  {this.state.statsPoints}
                </Typography>
              </span>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }

  private characterSelected = () => {
    this.setState({
      level: this.props.account.game.character.level,
      skinUrl: this.props.account.game.character.skinUrl
    });
  };

  private boostStat = (stat: BoostableStats) => () => {
    this.props.account.game.character.boostStat(stat);
  };

  private statsUpdated = () => {
    this.setState({
      actionPoints: this.totalStat(
        this.props.account.game.character.stats.actionPoints
      ),
      agility: this.totalStat(this.props.account.game.character.stats.agility),
      chance: this.totalStat(this.props.account.game.character.stats.chance),
      initiative: this.totalStat(
        this.props.account.game.character.stats.initiative
      ),
      intelligence: this.totalStat(
        this.props.account.game.character.stats.intelligence
      ),
      level: this.props.account.game.character.level,
      lifePoints: this.props.account.game.character.stats.lifePoints,
      maxLifePoints: this.props.account.game.character.stats.maxLifePoints,
      movementPoints: this.totalStat(
        this.props.account.game.character.stats.movementPoints
      ),
      prospecting: this.totalStat(
        this.props.account.game.character.stats.prospecting
      ),
      range: this.totalStat(this.props.account.game.character.stats.range),
      statsPoints: this.props.account.game.character.stats.statsPoints,
      strength: this.totalStat(
        this.props.account.game.character.stats.strength
      ),
      summonableCreaturesBoost: this.totalStat(
        this.props.account.game.character.stats.summonableCreaturesBoost
      ),
      vitality: this.totalStat(
        this.props.account.game.character.stats.vitality
      ),
      wisdom: this.totalStat(this.props.account.game.character.stats.wisdom)
    });
  };

  private totalStat(stat: CharacterBaseCharacteristic): number {
    return (
      stat.base +
      stat.objectsAndMountBonus +
      stat.alignGiftBonus +
      stat.contextModif
    );
  }
}

export default withStyles(characterStatsTabStyles)<ICharacterStatsTabProps>(
  Stats
);
