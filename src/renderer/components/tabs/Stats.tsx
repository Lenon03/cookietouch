import LanguageManager from "@/configurations/language/LanguageManager";
import {BoostableStats} from "@/game/character/BoostableStats";
import CharacterBaseCharacteristic from "@/protocol/network/types/CharacterBaseCharacteristic";
import Account from "@account";
import * as React from "react";
import {Button, Col, Container, Row} from "reactstrap";

interface IStatsProps {
  account: Account;
}

interface IStatsStates {
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

export default class Stats extends React.Component<IStatsProps, IStatsStates> {

  constructor(props: IStatsProps) {
    super(props);

    this.state = {
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
  }

  public componentDidMount() {
    this.props.account.game.character.CharacterSelected.on(this.characterSelected.bind(this));
    this.props.account.game.character.StatsUpdated.on(this.StatsUpdated.bind(this));
  }

  public componentWillUnmount() {
    this.props.account.game.character.CharacterSelected.off(this.characterSelected.bind(this));
    this.props.account.game.character.StatsUpdated.off(this.StatsUpdated.bind(this));
  }

  public render() {
    return (
      <Container id="stats">
        <Row>
          <Col>
            <Row>
              <Col>
                <h4>{this.props.account.game.character.name}</h4>
                <h5>{LanguageManager.trans("level")} {this.state.level}</h5>
              </Col>
            </Row>
            <img src={this.state.skinUrl} alt="personnage"/>
          </Col>

          <Col>
            <Row>
              <Col><h4>Résumé</h4></Col>
            </Row>

            <div className="stats-field">
              <div className="stats-logo">
                <img src={require("../../img/heart.png")} alt="coeur"/>
              </div>
              <div className="stats-label">
                {LanguageManager.trans("healthPoints")}
                <span className="float-right">
                  {this.state.lifePoints} / {this.state.maxLifePoints}
                </span>
              </div>
            </div>

            <div className="stats-field">
              <div className="stats-logo">
                <img src={require("../../img/starYellow.png")} alt="etoile_jaune"/>
              </div>
              <div className="stats-label">
                {LanguageManager.trans("actionPoints")}
                <span className="float-right">{this.state.actionPoints}</span>
              </div>
            </div>

            <div className="stats-field">
              <div className="stats-logo">
                <img src={require("../../img/movement.png")} alt="mouvement"/>
              </div>
              <div className="stats-label">
                {LanguageManager.trans("movementPoints")}
                <span className="float-right">{this.state.movementPoints}</span>
              </div>
            </div>

            <div className="stats-field">
              <div className="stats-logo">
                <img src={require("../../img/initiative.png")} alt=""/>
              </div>
              <div className="stats-label">
                Initiative
                <span className="float-right">{this.state.initiative}</span>
              </div>
            </div>

            <div className="stats-field">
              <div className="stats-logo">
                <img src={require("../../img/prospecting.png")} alt=""/>
              </div>
              <div className="stats-label">
                {LanguageManager.trans("prospecting")}
                <span className="float-right">{this.state.prospecting}</span>
              </div>
            </div>

            <div className="stats-field">
              <div className="stats-logo">
                <img src={require("../../img/range.png")} alt=""/>
              </div>
              <div className="stats-label">
                {LanguageManager.trans("range")}
                <span className="float-right">{this.state.range}</span>
              </div>
            </div>

            <div className="stats-field">
              <div className="stats-logo">
                <img src={require("../../img/summon.png")} alt=""/>
              </div>
              <div className="stats-label">
                {LanguageManager.trans("summons")}
                <span className="float-right">{this.state.summonableCreaturesBoost}</span>
              </div>
            </div>
          </Col>

          <Col>
            <Row>
              <Col xs="7"><h4>Stats</h4></Col>
              <Col className="text-right"><h5>Capital {this.state.statsPoints}</h5></Col>
            </Row>

            <div className="stats-field">
              <div className="stats-logo">
                <img src={require("../../img/vitality.png")} alt=""/>
              </div>
              <div className="stats-label">
                {LanguageManager.trans("vitality")}
                <span className="float-right">
                  {this.state.vitality}
                  <Button size="sm"
                          className="ml-3"
                          color="dark"
                          disabled={this.state.statsPoints <= 0}
                          onClick={() => this.props.account.game.character.boostStat(BoostableStats.VITALITY)}>+</Button>
                </span>
              </div>
            </div>

            <div className="stats-field">
              <div className="stats-logo">
                <img src={require("../../img/wisdom.png")} alt=""/>
              </div>
              <div className="stats-label">
                {LanguageManager.trans("wisdom")}
                <span className="float-right">
                  {this.state.wisdom}
                  <Button size="sm"
                          className="ml-3"
                          color="dark"
                          disabled={this.state.statsPoints <= 0}
                          onClick={() => this.props.account.game.character.boostStat(BoostableStats.WISDOM)}>+</Button>
                </span>
              </div>
            </div>

            <div className="stats-field">
              <div className="stats-logo">
                <img src={require("../../img/strength.png")} alt=""/>
              </div>
              <div className="stats-label">
                {LanguageManager.trans("strength")}
                <span className="float-right">
                  {this.state.strength}
                  <Button size="sm"
                          className="ml-3"
                          color="dark"
                          disabled={this.state.statsPoints <= 0}
                          onClick={() => this.props.account.game.character.boostStat(BoostableStats.STRENGTH)}>+</Button>
                </span>
              </div>
            </div>

            <div className="stats-field">
              <div className="stats-logo">
                <img src={require("../../img/intelligence.png")} alt=""/>
              </div>
              <div className="stats-label">
                {LanguageManager.trans("intelligence")}
                <span className="float-right">
                  {this.state.intelligence}
                  <Button size="sm"
                          className="ml-3"
                          color="dark"
                          disabled={this.state.statsPoints <= 0}
                          onClick={() => this.props.account.game.character.boostStat(BoostableStats.INTELLIGENCE)}>+</Button>
                </span>
              </div>
            </div>

            <div className="stats-field">
              <div className="stats-logo">
                <img src={require("../../img/chance.png")} alt=""/>
              </div>
              <div className="stats-label">
                {LanguageManager.trans("chance")}
                <span className="float-right">
                  {this.state.chance}
                  <Button size="sm"
                          className="ml-3"
                          color="dark"
                          disabled={this.state.statsPoints <= 0}
                          onClick={() => this.props.account.game.character.boostStat(BoostableStats.CHANCE)}>+</Button>
                </span>
              </div>
            </div>

            <div className="stats-field">
              <div className="stats-logo">
                <img src={require("../../img/agility.png")} alt=""/>
              </div>
              <div className="stats-label">
                {LanguageManager.trans("agility")}
                <span className="float-right">
                  {this.state.agility}
                  <Button size="sm"
                          className="ml-3"
                          color="dark"
                          disabled={this.state.statsPoints <= 0}
                          onClick={() => this.props.account.game.character.boostStat(BoostableStats.AGILITY)}>+</Button>
                </span>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }

  private characterSelected() {
    this.setState({
      level: this.props.account.game.character.level,
      skinUrl: this.props.account.game.character.skinUrl,
    });
  }

  private StatsUpdated() {
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
