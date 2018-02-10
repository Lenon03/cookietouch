import LanguageManager from "@/configurations/language/LanguageManager";
import Account from "@account";
import {AccountStates} from "@account/AccountStates";
import {faKorvue} from "@fortawesome/fontawesome-free-brands";
import {faBolt, faBriefcase, faHeart, faStar} from "@fortawesome/fontawesome-free-solid";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import {remote} from "electron";
import * as React from "react";
import {Button, Col, Container, Progress, Row, UncontrolledTooltip} from "reactstrap";

interface IInfosProps {
  account: Account;
  removeSelectedAccount: () => void;
}

interface IInfosStates {
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
}

export default class Infos extends React.Component<IInfosProps, IInfosStates> {

  constructor(props: IInfosProps) {
    super(props);
    this.state = {
      energyPoints: -1,
      energyPointsMax: -1,
      experience: -1,
      experienceMax: -1,
      experiencePercent: -1,
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
  }

  public componentDidMount() {
    this.props.account.game.character.StatsUpdated.on(this.statsUpdated.bind(this));
    this.props.account.game.fight.FighterStatsUpdated.on(this.fighterStatsUpdated.bind(this));
    this.props.account.StateChanged.on(this.stateChanged.bind(this));
    this.props.account.game.map.MapChanged.on(this.mapChanged.bind(this));
    this.props.account.game.character.inventory.InventoryUpdated.on(this.inventoryUpdated.bind(this));
    this.props.account.scripts.ScriptLoaded.on(this.scriptLoaded.bind(this));
  }

  public componentWillUnmount() {
    this.props.account.game.character.StatsUpdated.off(this.statsUpdated.bind(this));
    this.props.account.game.fight.FighterStatsUpdated.off(this.fighterStatsUpdated.bind(this));
    this.props.account.StateChanged.off(this.stateChanged.bind(this));
    this.props.account.game.map.MapChanged.off(this.mapChanged.bind(this));
    this.props.account.game.character.inventory.InventoryUpdated.off(this.inventoryUpdated.bind(this));
    this.props.account.scripts.ScriptLoaded.off(this.scriptLoaded.bind(this));
  }

  public render() {
    return (
      <Container fluid>
        <Row>
          <Col xs="2">
            <Button size="sm" color={this.props.account.network.connected ? "danger" : "success"} onClick={() => {
              if (this.props.account.network.connected) {
                this.stop();
              } else {
                this.start();
              }
            }}>{this.props.account.network.connected ? LanguageManager.trans("disconnect") : LanguageManager.trans("connect")}
            </Button>
          </Col>
          <Col xs="8">
            Script: {this.state.scriptName}
            <Button style={{
              marginLeft: "15px",
            }} size="sm" color="info" onClick={() => {
              remote.dialog.showOpenDialog({
                filters: [
                  {name: "Cookie Scripts Format", extensions: ["js"]},
                ],
                properties: ["openFile"],
              }, (filepaths) => {
                const filepath = filepaths[0];
                this.props.account.scripts.fromFile(filepath);
              });
            }}>
              {LanguageManager.trans("load")}
            </Button>
            <Button size="sm"
                    disabled={this.state.scriptLoaded ? false : true}
                    color="dark" onClick={() => this.launchScript()}>
              {LanguageManager.trans("play")}
            </Button>
            <Button size="sm"
                    disabled={this.state.scriptLoaded ? false : true}
                    color="warning" onClick={() => this.pauseScript()}>
              {LanguageManager.trans("pause")}
            </Button>
          </Col>
          <Col xs="2">
            <Button size="sm"
                    outline color="danger" onClick={() => {
              this.props.removeSelectedAccount();
            }}
            >
              {LanguageManager.trans("remove")}
            </Button>
          </Col>
        </Row>
        <hr/>
        <Row>
          <Col>{this.state.position}</Col>
          <Col md="3">Status: {AccountStates[this.state.status]}</Col>
        </Row>
        <hr/>
        <Row>
          <Col>
            <FontAwesomeIcon className="float-left" size="lg" icon={faHeart}/>
            <Progress style={{
              marginLeft: "20px",
            }} id="hpProgress"
                      color={this.props.account.game.character.stats.lifePercent > 80 ? "success"
                        : this.props.account.game.character.stats.lifePercent < 20 ? "danger" : "info"}
                      value={this.state.lifePoints}
                      max={this.state.lifePointsMax}
            >
              {(this.state.lifePoints !== -1 ? this.state.lifePoints / this.state.lifePointsMax * 100 : 0).toFixed(2)}%
            </Progress>
            <UncontrolledTooltip placement="top" target="hpProgress">
              {this.state.lifePoints} / {this.state.lifePointsMax}
            </UncontrolledTooltip>
          </Col>
          <Col>
            <FontAwesomeIcon className="float-left" size="lg" icon={faBriefcase}/>
            <Progress style={{
              marginLeft: "20px",
            }} id="weightProgress" color="secondary" value={this.state.weight} max={this.state.weightMax}>
              {(this.state.weight !== -1 ? this.state.weight / this.state.weightMax * 100 : 0).toFixed(2)}%
            </Progress>
            <UncontrolledTooltip placement="top" target="weightProgress">
              {this.state.weight} / {this.state.weightMax}
            </UncontrolledTooltip>
          </Col>
          <Col>
            <FontAwesomeIcon className="float-left" size="lg" icon={faStar}/>
            <Progress style={{
              marginLeft: "20px",
            }} id="xpProgress" color="info" value={this.state.experiencePercent} max={this.state.experiencePercent !== -1 ? 100 : -1}>
              {(this.state.experiencePercent !== -1 ? this.state.experiencePercent : 0).toFixed(2)}%
            </Progress>
            <UncontrolledTooltip placement="top" target="xpProgress">
              {this.state.experience} / {this.state.experienceMax}
            </UncontrolledTooltip>
          </Col>
          <Col>
            <FontAwesomeIcon className="float-left" size="lg" icon={faBolt}/>
            <Progress style={{
              marginLeft: "20px",
            }} id="energyProgress" color="warning" value={this.state.energyPoints} max={this.state.energyPointsMax}>
              {(this.state.energyPoints !== -1 ? this.state.energyPoints / this.state.energyPointsMax * 100 : 0).toFixed(2)}%
            </Progress>
            <UncontrolledTooltip placement="top" target="energyProgress">
              {this.state.energyPoints} / {this.state.energyPointsMax}
            </UncontrolledTooltip>
          </Col>
          <Col>
            <FontAwesomeIcon className="float-left" size="lg" icon={faKorvue}/>
            <Progress style={{
              marginLeft: "20px",
            }} value={100}>
              {this.state.kamas}
            </Progress>
          </Col>
        </Row>
        <hr/>
      </Container>
    );
  }

  private launchScript() {
    this.props.account.scripts.startScript();
  }

  private pauseScript() {
    this.props.account.scripts.stopScript(LanguageManager.trans("userStopScript"));
  }

  private scriptLoaded(scriptName: string) {
    this.setState({
      scriptLoaded: true,
      scriptName,
    });
  }

  private start() {
    this.props.account.start();
  }

  private stop() {
    this.props.account.stop();
  }

  private mapChanged() {
    this.setState({
      position: `${this.props.account.game.map.labelPosition} (${this.props.account.game.map.id})`,
    });
  }

  private stateChanged() {
    this.setState({status: this.props.account.state});
  }

  private statsUpdated() {
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

  private fighterStatsUpdated() {
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

  private inventoryUpdated() {
    this.setState({
      kamas: this.props.account.game.character.inventory.kamas,
      weight: this.props.account.game.character.inventory.weight,
      weightMax: this.props.account.game.character.inventory.weightMax,
    });
  }
}
