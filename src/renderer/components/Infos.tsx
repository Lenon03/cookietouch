import Account from "@account";
import { AccountStates } from "@account/AccountStates";
import * as React from "react";
import { Button, Col, Container, Progress, Row } from "reactstrap";

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
          <Col>
            <Button color="primary" size="sm" onClick={() => {
              if (this.props.account.network.connected) {
                this.stop();
              } else {
                this.start();
              }
            }}>Connect/Disconnect</Button>
            <Button color="primary" size="sm" onClick={() => {
              this.props.removeSelectedAccount();
            }}>Remove</Button>
            <Button color="primary" size="sm">Load</Button>
            <Button color="primary" size="sm" onClick={() => this.launchScript()}>Play</Button>
            <Button color="primary" size="sm" onClick={() => this.pauseScript()}>Pause</Button>
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
            <Progress value={this.state.lifePoints} max={this.state.lifePointsMax}>
              HP: {this.state.lifePoints} / {this.state.lifePointsMax}
            </Progress>
          </Col>
          <Col>
            <Progress value={this.state.weight} max={this.state.weightMax}>
              Pods: {this.state.weight} / {this.state.weightMax}
            </Progress>
          </Col>
          <Col>
            <Progress value={this.state.experience} max={this.state.experienceMax}>
              XP: {this.state.experience} / {this.state.experienceMax}
            </Progress>
          </Col>
          <Col>
            <Progress value={this.state.energyPoints} max={this.state.energyPointsMax}>
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
    // this.props.account.scripts.fromFile(path.join(__dirname, "../../../resources/scripts/[Déplacement][Incarnam] Go Astrub!.js"));
  }

  private pauseScript() {
    this.props.account.scripts.stopScript("The user stopped the script.");
  }

  private scriptLoaded(scriptName: string) {
    this.props.account.scripts.startScript();
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
