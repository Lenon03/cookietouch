import { BoostableStats } from "@/game/character/BoostableStats";
import CharacterBaseCharacteristic from "@/protocol/network/types/CharacterBaseCharacteristic";
import Account from "@account";
import * as React from "react";
import { Button, Card, CardBody, CardGroup, CardImg, CardSubtitle, CardText, CardTitle, Col, Container, Row } from "reactstrap";

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
      <Container>
        <Row>
          <Col>
            <CardGroup>
              <Card body inverse color="dark">
                <CardTitle>{this.props.account.game.character.name}</CardTitle>
                <CardSubtitle>Level {this.state.level}</CardSubtitle>
                <CardImg height="256" width="128" src={this.state.skinUrl} />
              </Card>
              <Card body inverse color="dark">
                <CardTitle>Résumé</CardTitle>
                <CardText>
                  <img height="20" width="20" className="float-left" src={require("../../img/heart.png")} alt="heart" />
                  Points de vie <span className="float-right">{this.state.lifePoints} / {this.state.maxLifePoints}</span>
                </CardText>
                <CardText>
                  <img height="20" width="20" className="float-left" src={require("../../img/starYellow.png")} alt="starYellow" />
                  Points d'action <span className="float-right">{this.state.actionPoints}</span>
                </CardText>
                <CardText>
                  <img height="20" width="20" className="float-left" src={require("../../img/movement.png")} alt="movement" />
                  Points de mouvement <span className="float-right">{this.state.movementPoints}</span>
                </CardText>
                <CardText>
                  <img height="20" width="20" className="float-left" src={require("../../img/initiative.png")} alt="initiative" />
                  Initiative <span className="float-right">{this.state.initiative}</span>
                </CardText>
                <CardText>
                  <img height="20" width="20" className="float-left" src={require("../../img/prospecting.png")} alt="prospecting" />
                  Prospection <span className="float-right">{this.state.prospecting}</span>
                </CardText>
                <CardText>
                  <img height="20" width="20" className="float-left" src={require("../../img/range.png")} alt="range" />
                  Portée <span className="float-right">{this.state.range}</span>
                </CardText>
                <CardText>
                  <img height="20" width="20" className="float-left" src={require("../../img/summon.png")} alt="summon" />
                  Invocations <span className="float-right">{this.state.summonableCreaturesBoost}</span>
                </CardText>
              </Card>
              <Card body inverse color="dark">
                <div className="clearfix">
                  <CardTitle className="float-left">Stats</CardTitle>
                  <h6 className="float-right">Capital {this.state.statsPoints}</h6>
                </div>
                <CardText>
                  <img height="20" width="20" className="float-left" src={require("../../img/vitality.png")} alt="vitality" />
                  Vitalité
                  <span className="float-right">
                    {this.state.vitality}
                    <Button size="sm"
                      color="dark"
                      disabled={this.state.statsPoints > 0 ? false : true}
                      onClick={() => this.props.account.game.character.boostStat(BoostableStats.VITALITY)}>+</Button>
                  </span>
                </CardText>
                <CardText>
                  <img height="20" width="20" className="float-left" src={require("../../img/wisdom.png")} alt="wisdom" />
                  Sagesse
                  <span className="float-right">
                    {this.state.wisdom}
                    <Button size="sm"
                      color="dark"
                      disabled={this.state.statsPoints > 0 ? false : true}
                      onClick={() => this.props.account.game.character.boostStat(BoostableStats.WISDOM)}>+</Button>
                  </span>
                </CardText>
                <CardText>
                  <img height="20" width="20" className="float-left" src={require("../../img/strength.png")} alt="strength" />
                  Force
                  <span className="float-right">
                    {this.state.strength}
                    <Button size="sm"
                      color="dark"
                      disabled={this.state.statsPoints > 0 ? false : true}
                      onClick={() => this.props.account.game.character.boostStat(BoostableStats.STRENGTH)}>+</Button>
                  </span>
                </CardText>
                <CardText>
                  <img height="20" width="20" className="float-left" src={require("../../img/intelligence.png")} alt="intelligence" />
                  Intelligence
                  <span className="float-right">
                    {this.state.intelligence}
                    <Button size="sm"
                      color="dark"
                      disabled={this.state.statsPoints > 0 ? false : true}
                      onClick={() => this.props.account.game.character.boostStat(BoostableStats.INTELLIGENCE)}>+</Button>
                  </span>
                </CardText>
                <CardText>
                  <img height="20" width="20" className="float-left" src={require("../../img/chance.png")} alt="chance" />
                  Chance
                  <span className="float-right">
                    {this.state.chance}
                    <Button size="sm"
                      color="dark"
                      disabled={this.state.statsPoints > 0 ? false : true}
                      onClick={() => this.props.account.game.character.boostStat(BoostableStats.CHANCE)}>+</Button>
                  </span>
                </CardText>
                <CardText>
                  <img height="20" width="20" className="float-left" src={require("../../img/agility.png")} alt="agility" />
                  Agilité
                  <span className="float-right">
                    {this.state.agility}
                    <Button size="sm"
                      color="dark"
                      disabled={this.state.statsPoints > 0 ? false : true}
                      onClick={() => this.props.account.game.character.boostStat(BoostableStats.AGILITY)}>+</Button>
                  </span>
                </CardText>
              </Card>
            </CardGroup>
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
