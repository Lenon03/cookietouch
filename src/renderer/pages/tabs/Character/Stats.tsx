import LanguageManager from "@/configurations/language/LanguageManager";
import { BoostableStats } from "@/game/character/BoostableStats";
import CharacterBaseCharacteristic from "@/protocol/network/types/CharacterBaseCharacteristic";
import Account from "@account";
import Button from "material-ui/Button";
import Grid from "material-ui/Grid";
import withStyles, { StyleRulesCallback, WithStyles } from "material-ui/styles/withStyles";
import * as React from "react";

type style = "root" | "statsField" | "statsLogo" | "statsLabel" | "statsLabelSpan";

const styles: StyleRulesCallback<style> = (theme) => ({
  root: {
    flexGrow: 1,
  },
  statsField: {
    // display: "flex",
    // fontSize: 14,
    // lineHeight: 30,
    // marginBottom: 8,
  },
  statsLabel: {
    // flex: 1,
    // marginLeft: 5,
  },
  statsLabelSpan: {
    float: "right",
  },
  statsLogo: {
    // flex: "0 0 50px",
    // img: {
    //   height: 10,
    // },
    // textAlign: "center",
  },
});

interface IProps {
  account: Account;
}

interface IState {
  level: number;
  skinUrl: string;
  lifePoints: number;
  maxLifePoints: number;
  actionPoints: number;
  movementPoints: number;
  initiative: number;
  prospecting: number;
  range: number;
  summonableCreaturesBoost: number;
  vitality: number;
  wisdom: number;
  strength: number;
  intelligence: number;
  chance: number;
  agility: number;
  statsPoints: number;
}

type Props = IProps & WithStyles<style>;

class Stats extends React.Component<Props, IState> {

  public state: IState = {
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
    wisdom: -1,
  };

  public componentDidMount() {
    this.props.account.game.character.CharacterSelected.on(this.characterSelected);
    this.props.account.game.character.StatsUpdated.on(this.statsUpdated);
  }

  public componentWillUnmount() {
    this.props.account.game.character.CharacterSelected.off(this.characterSelected);
    this.props.account.game.character.StatsUpdated.off(this.statsUpdated);
  }

  public render() {
    const { account, classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={16}>
          <Grid item xs={4}>
            <h4>{account.game.character.name}</h4>
            <h5>{LanguageManager.trans("level")} {this.state.level}</h5>
            <img src={this.state.skinUrl} alt="character" />
          </Grid>
          <Grid item xs={4}>
            <h4>{LanguageManager.trans("summary")}</h4>
            <div className={classes.statsField}>
              <div className={classes.statsLogo}>
                <img src={require("../../../img/heart.png")} alt="coeur" />
              </div>
              <div className={classes.statsLabel}>
                {LanguageManager.trans("healthPoints")}
                <span className={classes.statsLabelSpan}>
                  {this.state.lifePoints} / {this.state.maxLifePoints}
                </span>
              </div>
            </div>

            <div className={classes.statsField}>
              <div className={classes.statsLogo}>
                <img src={require("../../../img/starYellow.png")} alt="etoile_jaune" />
              </div>
              <div className={classes.statsLabel}>
                {LanguageManager.trans("actionPoints")}
                <span className={classes.statsLabelSpan}>{this.state.actionPoints}</span>
              </div>
            </div>

            <div className={classes.statsField}>
              <div className={classes.statsLogo}>
                <img src={require("../../../img/movement.png")} alt="mouvement" />
              </div>
              <div className={classes.statsLabel}>
                {LanguageManager.trans("movementPoints")}
                <span className={classes.statsLabelSpan}>{this.state.movementPoints}</span>
              </div>
            </div>

            <div className={classes.statsField}>
              <div className={classes.statsLogo}>
                <img src={require("../../../img/initiative.png")} alt="" />
              </div>
              <div className={classes.statsLabel}>
                Initiative
                <span className={classes.statsLabelSpan}>{this.state.initiative}</span>
              </div>
            </div>

            <div className={classes.statsField}>
              <div className={classes.statsLogo}>
                <img src={require("../../../img/prospecting.png")} alt="" />
              </div>
              <div className={classes.statsLabel}>
                {LanguageManager.trans("prospecting")}
                <span className={classes.statsLabelSpan}>{this.state.prospecting}</span>
              </div>
            </div>

            <div className={classes.statsField}>
              <div className={classes.statsLogo}>
                <img src={require("../../../img/range.png")} alt="" />
              </div>
              <div className={classes.statsLabel}>
                {LanguageManager.trans("range")}
                <span className={classes.statsLabelSpan}>{this.state.range}</span>
              </div>
            </div>

            <div className={classes.statsField}>
              <div className={classes.statsLogo}>
                <img src={require("../../../img/summon.png")} alt="" />
              </div>
              <div className={classes.statsLabel}>
                {LanguageManager.trans("summons")}
                <span className={classes.statsLabelSpan}>{this.state.summonableCreaturesBoost}</span>
              </div>
            </div>
          </Grid>
          <Grid item xs={4}>
            <h4>{LanguageManager.trans("stats")}</h4>
            <h5>{LanguageManager.trans("points")} {this.state.statsPoints}</h5>

            <div className={classes.statsField}>
              <div className={classes.statsLogo}>
                <img src={require("../../../img/vitality.png")} alt="" />
              </div>
              <div className={classes.statsLabel}>
                {LanguageManager.trans("vitality")}
                <span className={classes.statsLabelSpan}>
                  {this.state.vitality}
                  <Button variant="fab"
                    mini
                    color="primary"
                    disabled={this.state.statsPoints <= 0}
                    onClick={() => this.props.account.game.character.boostStat(BoostableStats.VITALITY)}>+</Button>
                </span>
              </div>
            </div>

            <div className={classes.statsField}>
              <div className={classes.statsLogo}>
                <img src={require("../../../img/wisdom.png")} alt="" />
              </div>
              <div className={classes.statsLabel}>
                {LanguageManager.trans("wisdom")}
                <span className={classes.statsLabelSpan}>
                  {this.state.wisdom}
                  <Button variant="fab"
                    mini
                    color="primary"
                    disabled={this.state.statsPoints <= 0}
                    onClick={() => this.props.account.game.character.boostStat(BoostableStats.WISDOM)}>+</Button>
                </span>
              </div>
            </div>

            <div className={classes.statsField}>
              <div className={classes.statsLogo}>
                <img src={require("../../../img/strength.png")} alt="" />
              </div>
              <div className={classes.statsLabel}>
                {LanguageManager.trans("strength")}
                <span className={classes.statsLabelSpan}>
                  {this.state.strength}
                  <Button variant="fab"
                    mini
                    color="primary"
                    disabled={this.state.statsPoints <= 0}
                    onClick={() => this.props.account.game.character.boostStat(BoostableStats.STRENGTH)}>+</Button>
                </span>
              </div>
            </div>

            <div className={classes.statsField}>
              <div className={classes.statsLogo}>
                <img src={require("../../../img/intelligence.png")} alt="" />
              </div>
              <div className={classes.statsLabel}>
                {LanguageManager.trans("intelligence")}
                <span className={classes.statsLabelSpan}>
                  {this.state.intelligence}
                  <Button variant="fab"
                    mini
                    color="primary"
                    disabled={this.state.statsPoints <= 0}
                    onClick={() => this.props.account.game.character.boostStat(BoostableStats.INTELLIGENCE)}>+</Button>
                </span>
              </div>
            </div>

            <div className={classes.statsField}>
              <div className={classes.statsLogo}>
                <img src={require("../../../img/chance.png")} alt="" />
              </div>
              <div className={classes.statsLabel}>
                {LanguageManager.trans("chance")}
                <span className={classes.statsLabelSpan}>
                  {this.state.chance}
                  <Button variant="fab"
                    mini
                    color="primary"
                    disabled={this.state.statsPoints <= 0}
                    onClick={() => this.props.account.game.character.boostStat(BoostableStats.CHANCE)}>+</Button>
                </span>
              </div>
            </div>

            <div className={classes.statsField}>
              <div className={classes.statsLogo}>
                <img src={require("../../../img/agility.png")} alt="" />
              </div>
              <div className={classes.statsLabel}>
                {LanguageManager.trans("agility")}
                <span className={classes.statsLabelSpan}>
                  {this.state.agility}
                  <Button variant="fab"
                    mini
                    color="primary"
                    disabled={this.state.statsPoints <= 0}
                    onClick={() => this.props.account.game.character.boostStat(BoostableStats.AGILITY)}>+</Button>
                </span>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }

  private characterSelected = () => {
    this.setState({
      level: this.props.account.game.character.level,
      skinUrl: this.props.account.game.character.skinUrl,
    });
  }

  private statsUpdated = () => {
    this.setState({
      actionPoints: this.totalStat(this.props.account.game.character.stats.actionPoints),
      agility: this.totalStat(this.props.account.game.character.stats.agility),
      chance: this.totalStat(this.props.account.game.character.stats.chance),
      initiative: this.totalStat(this.props.account.game.character.stats.initiative),
      intelligence: this.totalStat(this.props.account.game.character.stats.intelligence),
      level: this.props.account.game.character.level,
      lifePoints: this.props.account.game.character.stats.lifePoints,
      maxLifePoints: this.props.account.game.character.stats.maxLifePoints,
      movementPoints: this.totalStat(this.props.account.game.character.stats.movementPoints),
      prospecting: this.totalStat(this.props.account.game.character.stats.prospecting),
      range: this.totalStat(this.props.account.game.character.stats.range),
      statsPoints: this.props.account.game.character.stats.statsPoints,
      strength: this.totalStat(this.props.account.game.character.stats.strength),
      summonableCreaturesBoost: this.totalStat(this.props.account.game.character.stats.summonableCreaturesBoost),
      vitality: this.totalStat(this.props.account.game.character.stats.vitality),
      wisdom: this.totalStat(this.props.account.game.character.stats.wisdom),
    });
  }

  private totalStat(stat: CharacterBaseCharacteristic): number {
    return stat.base + stat.objectsAndMountBonus + stat.alignGiftBonus + stat.contextModif;
  }
}

export default withStyles(styles)<IProps>(Stats);
