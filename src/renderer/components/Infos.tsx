import Account from "@account";
import { AccountStates } from "@account/AccountStates";
import { remote } from "electron";
import * as React from "react";
import { Button, Col, Container, Progress, Row } from "reactstrap";
import CookieMain from "renderer/CookieMain";

interface IInfosProps {
  account: Account;
  removeSelectedAccount: () => void;
}

interface IInfosStates {
  energyPoints: number;
  energyPointsMax: number;
  experience: number;
  experienceMax: number;
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
      energyPoints: 0,
      energyPointsMax: 0,
      experience: 0,
      experienceMax: 0,
      kamas: 0,
      lifePoints: 0,
      lifePointsMax: 0,
      position: "",
      scriptLoaded: false,
      scriptName: "",
      status: AccountStates.DISCONNECTED,
      weight: 0,
      weightMax: 0,
    };
  }

  public componentDidMount() {
    this.props.account.game.character.StatsUpdated.on(this.statsUpdated.bind(this));
    this.props.account.StateChanged.on(this.stateChanged.bind(this));
    this.props.account.game.map.MapChanged.on(this.mapChanged.bind(this));
    this.props.account.game.character.inventory.InventoryUpdated.on(this.inventoryUpdated.bind(this));
    this.props.account.scripts.ScriptLoaded.on(this.scriptLoaded.bind(this));
  }

  public componentWillUnmount() {
    this.props.account.game.character.StatsUpdated.off(this.statsUpdated.bind(this));
    this.props.account.StateChanged.off(this.stateChanged.bind(this));
    this.props.account.game.map.MapChanged.off(this.mapChanged.bind(this));
    this.props.account.game.character.inventory.InventoryUpdated.off(this.inventoryUpdated.bind(this));
    this.props.account.scripts.ScriptLoaded.off(this.scriptLoaded.bind(this));
  }

  public render() {
    return (
      <Container>
        <Row>
          <Col xs="2">
            <Button size="sm" color={this.props.account.network.connected ? "danger" : "success"} onClick={() => {
              if (this.props.account.network.connected) {
                this.stop();
              } else {
                this.start();
              }
            }}>{this.props.account.network.connected ? "Disconnect" : "Connect"}
            </Button>
          </Col>
          <Col xs="8">
            Script: {this.state.scriptName}
            <Button size="sm" color="info" onClick={() => {
              remote.dialog.showOpenDialog({ properties: ["openFile"] }, (filepaths) => {
                const filepath = filepaths[0];
                this.props.account.scripts.fromFile(filepath);
              });
            }}>
              Load
            </Button>
            <Button size="sm"
              disabled={this.state.scriptLoaded ? false : true}
              color="dark" onClick={() => this.launchScript()}>Play</Button>
            <Button size="sm"
              disabled={this.state.scriptLoaded ? false : true}
              color="warning" onClick={() => this.pauseScript()}>Pause</Button>
          </Col>
          <Col xs="2">
            <Button size="sm"
              outline color="danger" onClick={() => {
                this.props.removeSelectedAccount();
              }}
            >
              Remove
            </Button>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col>{this.state.position}</Col>
          <Col md="3">Status: {AccountStates[this.state.status]}</Col>
        </Row>
        <hr />
        <Row>
          <Col>
            <Progress
              color={this.props.account.game.character.stats.lifePercent > 80 ? "success"
                      : this.props.account.game.character.stats.lifePercent < 20 ? "danger" : "info"}
              value={this.state.lifePoints}
              max={this.state.lifePointsMax}
            >
              HP: {this.state.lifePoints} / {this.state.lifePointsMax}
            </Progress>
          </Col>
          <Col>
            <Progress color="secondary" value={this.state.weight} max={this.state.weightMax}>
              Pods: {this.state.weight} / {this.state.weightMax}
            </Progress>
          </Col>
          <Col>
            <Progress color="info" value={this.state.experience} max={this.state.experienceMax}>
              XP: {this.state.experience} / {this.state.experienceMax}
            </Progress>
          </Col>
          <Col>
            <Progress color="warning" value={this.state.energyPoints} max={this.state.energyPointsMax}>
              Energy: {this.state.energyPoints} / {this.state.energyPointsMax}
            </Progress>
          </Col>
          <Col>
            <Progress value={100}>
              {this.state.kamas} Kamas
            </Progress>
          </Col>
        </Row>
        <hr />
      </Container>
    );
  }

  private launchScript() {
    this.props.account.scripts.startScript();
  }

  private pauseScript() {
    this.props.account.scripts.stopScript("The user stopped the script.");
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
    this.setState({ status: this.props.account.state });
  }

  private statsUpdated() {
    this.setState({
      energyPoints: this.props.account.game.character.stats.energyPoints,
      energyPointsMax: this.props.account.game.character.stats.maxEnergyPoints,
      experience: this.props.account.game.character.stats.experience,
      experienceMax: this.props.account.game.character.stats.experienceNextLevelFloor,
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
