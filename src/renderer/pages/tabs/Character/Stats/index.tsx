import LanguageManager from "@/configurations/language/LanguageManager";
import { BoostableStats } from "@/game/character/BoostableStats";
import CharacterBaseCharacteristic from "@/protocol/network/types/CharacterBaseCharacteristic";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
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
            <h4>{account.game.character.name}</h4>
            <h5>
              {LanguageManager.trans("level")} {this.state.level}
            </h5>
            <img src={this.state.skinUrl} alt="character" />
          </Grid>
          <Grid item={true} xs={4}>
            <h4>{LanguageManager.trans("summary")}</h4>
            <div>
              <div>
                <img src={require("@renderer/img/heart.png")} alt="coeur" />
              </div>
              <div>
                {LanguageManager.trans("healthPoints")}
                <span className={classes.statsLabelSpan}>
                  {this.state.lifePoints} / {this.state.maxLifePoints}
                </span>
              </div>
            </div>

            <div>
              <div>
                <img
                  src={require("@renderer/img/starYellow.png")}
                  alt="etoile_jaune"
                />
              </div>
              <div>
                {LanguageManager.trans("actionPoints")}
                <span className={classes.statsLabelSpan}>
                  {this.state.actionPoints}
                </span>
              </div>
            </div>

            <div>
              <div>
                <img
                  src={require("@renderer/img/movement.png")}
                  alt="mouvement"
                />
              </div>
              <div>
                {LanguageManager.trans("movementPoints")}
                <span className={classes.statsLabelSpan}>
                  {this.state.movementPoints}
                </span>
              </div>
            </div>

            <div>
              <div>
                <img src={require("@renderer/img/initiative.png")} alt="" />
              </div>
              <div>
                Initiative
                <span className={classes.statsLabelSpan}>
                  {this.state.initiative}
                </span>
              </div>
            </div>

            <div>
              <div>
                <img src={require("@renderer/img/prospecting.png")} alt="" />
              </div>
              <div>
                {LanguageManager.trans("prospecting")}
                <span className={classes.statsLabelSpan}>
                  {this.state.prospecting}
                </span>
              </div>
            </div>

            <div>
              <div>
                <img src={require("@renderer/img/range.png")} alt="" />
              </div>
              <div>
                {LanguageManager.trans("range")}
                <span className={classes.statsLabelSpan}>
                  {this.state.range}
                </span>
              </div>
            </div>

            <div>
              <div>
                <img src={require("@renderer/img/summon.png")} alt="" />
              </div>
              <div>
                {LanguageManager.trans("summons")}
                <span className={classes.statsLabelSpan}>
                  {this.state.summonableCreaturesBoost}
                </span>
              </div>
            </div>
          </Grid>
          <Grid item={true} xs={4}>
            <h4>{LanguageManager.trans("stats")}</h4>
            <h5>
              {LanguageManager.trans("points")} {this.state.statsPoints}
            </h5>

            <div>
              <div>
                <img src={require("@renderer/img/vitality.png")} alt="" />
              </div>
              <div>
                {LanguageManager.trans("vitality")}
                <span className={classes.statsLabelSpan}>
                  {this.state.vitality}
                  <Button
                    variant="fab"
                    mini={true}
                    color="primary"
                    disabled={this.state.statsPoints <= 0}
                    onClick={() =>
                      this.props.account.game.character.boostStat(
                        BoostableStats.VITALITY
                      )
                    }
                  >
                    +
                  </Button>
                </span>
              </div>
            </div>

            <div>
              <div>
                <img src={require("@renderer/img/wisdom.png")} alt="" />
              </div>
              <div>
                {LanguageManager.trans("wisdom")}
                <span className={classes.statsLabelSpan}>
                  {this.state.wisdom}
                  <Button
                    variant="fab"
                    mini={true}
                    color="primary"
                    disabled={this.state.statsPoints <= 0}
                    onClick={() =>
                      this.props.account.game.character.boostStat(
                        BoostableStats.WISDOM
                      )
                    }
                  >
                    +
                  </Button>
                </span>
              </div>
            </div>

            <div>
              <div>
                <img src={require("@renderer/img/strength.png")} alt="" />
              </div>
              <div>
                {LanguageManager.trans("strength")}
                <span className={classes.statsLabelSpan}>
                  {this.state.strength}
                  <Button
                    variant="fab"
                    mini={true}
                    color="primary"
                    disabled={this.state.statsPoints <= 0}
                    onClick={() =>
                      this.props.account.game.character.boostStat(
                        BoostableStats.STRENGTH
                      )
                    }
                  >
                    +
                  </Button>
                </span>
              </div>
            </div>

            <div>
              <div>
                <img src={require("@renderer/img/intelligence.png")} alt="" />
              </div>
              <div>
                {LanguageManager.trans("intelligence")}
                <span className={classes.statsLabelSpan}>
                  {this.state.intelligence}
                  <Button
                    variant="fab"
                    mini={true}
                    color="primary"
                    disabled={this.state.statsPoints <= 0}
                    onClick={() =>
                      this.props.account.game.character.boostStat(
                        BoostableStats.INTELLIGENCE
                      )
                    }
                  >
                    +
                  </Button>
                </span>
              </div>
            </div>

            <div>
              <div>
                <img src={require("@renderer/img/chance.png")} alt="" />
              </div>
              <div>
                {LanguageManager.trans("chance")}
                <span className={classes.statsLabelSpan}>
                  {this.state.chance}
                  <Button
                    variant="fab"
                    mini={true}
                    color="primary"
                    disabled={this.state.statsPoints <= 0}
                    onClick={() =>
                      this.props.account.game.character.boostStat(
                        BoostableStats.CHANCE
                      )
                    }
                  >
                    +
                  </Button>
                </span>
              </div>
            </div>

            <div>
              <div>
                <img src={require("@renderer/img/agility.png")} alt="" />
              </div>
              <div>
                {LanguageManager.trans("agility")}
                <span className={classes.statsLabelSpan}>
                  {this.state.agility}
                  <Button
                    variant="fab"
                    mini={true}
                    color="primary"
                    disabled={this.state.statsPoints <= 0}
                    onClick={() =>
                      this.props.account.game.character.boostStat(
                        BoostableStats.AGILITY
                      )
                    }
                  >
                    +
                  </Button>
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
      skinUrl: this.props.account.game.character.skinUrl
    });
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
