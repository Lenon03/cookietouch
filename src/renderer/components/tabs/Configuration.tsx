import SpellToBoostEntry from "@/account/configurations/SpellToBoostEntry";
import LanguageManager from "@/configurations/language/LanguageManager";
import {BoostableStats} from "@/game/character/BoostableStats";
import DataManager from "@/protocol/data";
import Breeds from "@/protocol/data/classes/Breeds";
import Spells from "@/protocol/data/classes/Spells";
import {DataTypes} from "@/protocol/data/DataTypes";
import Account from "@account";
import * as React from "react";
import {Button, Card, CardText, CardTitle, Col, Container, FormGroup, Input, InputGroup, InputGroupAddon, Label, Row, Table} from "reactstrap";

interface IConfigurationProps {
  account: Account;
}

enum SpellLevels { ONE = 1, TWO = 2, THREE = 3, FOUR = 4, FIVE = 5, SIX = 6 }

interface IConfigurationStates {
  acceptAchievements: boolean;
  authorizedTradesFrom: number[];
  autoRegenAccepted: boolean;
  autoMount: boolean;
  characterConnected: boolean;
  disconnectUponFightsLimit: boolean;
  enableSpeedHack: boolean;
  ignoreNonAuthorizedTrades: boolean;
  spellId: number;
  spellLevel: SpellLevels;
  spells: SpellToBoostEntry[];
  statToBoost: number;
  toAddToAuthorized: number;
}

export default class Configuration extends React.Component<IConfigurationProps, IConfigurationStates> {

  constructor(props: IConfigurationProps) {
    super(props);

    this.state = {
      acceptAchievements: true,
      authorizedTradesFrom: [],
      autoMount: true,
      autoRegenAccepted: false,
      characterConnected: false,
      disconnectUponFightsLimit: false,
      enableSpeedHack: false,
      ignoreNonAuthorizedTrades: false,
      spellId: -1,
      spellLevel: SpellLevels.SIX,
      spells: [],
      statToBoost: BoostableStats.NONE,
      toAddToAuthorized: -1,
    };
  }

  public componentDidMount() {
    this.props.account.game.character.CharacterSelected.on(this.characterSelected.bind(this));
  }

  public componentWillUnmount() {
    this.props.account.game.character.CharacterSelected.off(this.characterSelected.bind(this));
  }

  public render() {
    return (
      <Container>
        <Row>
          <Col>
            <Card body inverse color="dark">
              <CardTitle>{LanguageManager.trans("automaticIncreases")}</CardTitle>
              <FormGroup>
                <Label for="boostableStat">{LanguageManager.trans("statToBoost")}</Label>
                <Input type="select" className="form-control-sm" id="boostableStat"
                       disabled={this.state.characterConnected ? "" : "disabled"}
                       value={this.state.statToBoost}
                       onChange={(event) => this.boostableStatChanged(event)}>
                  <option value={BoostableStats.NONE}>{LanguageManager.trans("none")}</option>
                  <option value={BoostableStats.VITALITY}>{LanguageManager.trans("vitality")}</option>
                  <option value={BoostableStats.WISDOM}>{LanguageManager.trans("wisdom")}</option>
                  <option value={BoostableStats.STRENGTH}>{LanguageManager.trans("strength")}</option>
                  <option value={BoostableStats.AGILITY}>{LanguageManager.trans("agility")}</option>
                  <option value={BoostableStats.CHANCE}>{LanguageManager.trans("chance")}</option>
                  <option value={BoostableStats.INTELLIGENCE}>{LanguageManager.trans("intelligence")}</option>
                </Input>
              </FormGroup>
              <hr/>
              <Table striped bordered size="sm" responsive>
                <thead>
                <tr>
                  <th>ID</th>
                  <th>{LanguageManager.trans("name")}</th>
                  <th>{LanguageManager.trans("level")}</th>
                  <th>{LanguageManager.trans("actions")}</th>
                </tr>
                </thead>
                <tbody>
                {this.state.spells.map((c, index) => (
                  <tr key={index}>
                    <td>{c.id}</td>
                    <td>{c.name}</td>
                    <td>{c.level}</td>
                    <td>
                      <Button disabled={this.state.characterConnected ? false : true}
                              outline color="danger" size="sm" onClick={() => {
                        this.props.account.config.spellsToBoost = this.props.account.config.spellsToBoost.filter((s) => s.id !== c.id);
                        this.props.account.config.save();
                        this.setState({spells: this.props.account.config.spellsToBoost});
                      }}>
                        X
                      </Button>
                    </td>
                  </tr>
                ))}
                </tbody>
              </Table>
              <InputGroup>
                <Input
                  disabled={this.state.characterConnected ? "" : "disabled"}
                  type="number" className="form-control-sm" value={this.state.spellId}
                  onChange={(event) => {
                    const value = parseInt(event.target.value, 10);
                    if (!value) {
                      return;
                    }
                    this.setState({spellId: value});
                  }}/>
                <Input type="select" className="form-control-sm"
                       disabled={this.state.characterConnected ? "" : "disabled"}
                       value={this.state.spellLevel}
                       onChange={(event) => {
                         const value = parseInt(event.target.value, 10);
                         this.setState({spellLevel: value});
                       }}>
                  <option value={SpellLevels.ONE}>1</option>
                  <option value={SpellLevels.TWO}>2</option>
                  <option value={SpellLevels.THREE}>3</option>
                  <option value={SpellLevels.FOUR}>4</option>
                  <option value={SpellLevels.FIVE}>5</option>
                  <option value={SpellLevels.SIX}>6</option>
                </Input>
                <Button disabled={this.state.characterConnected ? false : true}
                        color="light" size="sm" onClick={async () => {
                  const resp = await DataManager.get<Spells>(DataTypes.Spells, this.state.spellId);
                  if (resp.length === 0) {
                    return;
                  }
                  const name = resp[0].object.nameId;
                  const spellsAdded = this.props.account.config.spellsToBoost.map((s) => s.id);
                  if (spellsAdded.includes(this.state.spellId)) {
                    alert(LanguageManager.trans("alreadyAddSpell"));
                    return;
                  }
                  const respBreeds = await DataManager.get<Breeds>(DataTypes.Breeds, this.props.account.game.character.breed);
                  const spellsIds = respBreeds[0].object.breedSpellsId;
                  if (!spellsIds.includes(this.state.spellId)) {
                    alert(LanguageManager.trans("spellNotBreed"));
                    return;
                  }
                  this.props.account.config.spellsToBoost.push(new SpellToBoostEntry(this.state.spellId, name, this.state.spellLevel));
                  this.props.account.config.save();
                  this.setState({spells: this.props.account.config.spellsToBoost});
                }}>
                  {LanguageManager.trans("add")}
                </Button>
              </InputGroup>
            </Card>
          </Col>
          <Col>
            <Card body inverse color="dark">
              <CardTitle>{LanguageManager.trans("divers")}</CardTitle>
              <FormGroup check>
                <Label check>
                  <Input type="checkbox"
                         disabled={this.state.characterConnected ? "" : "disabled"}
                         checked={this.state.enableSpeedHack}
                         onChange={(event) => this.speedhackChanged(event)}/>
                  {LanguageManager.trans("speedhack")}
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type="checkbox"
                         disabled={this.state.characterConnected ? "" : "disabled"}
                         checked={this.state.autoMount}
                         onChange={(event) => this.autoMountChanged(event)}/>
                  {LanguageManager.trans("autoMount")}
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type="checkbox"
                         disabled={this.state.characterConnected ? "" : "disabled"}
                         checked={this.state.acceptAchievements}
                         onChange={(event) => this.acceptAchievementsChanged(event)}/>
                  {LanguageManager.trans("acceptAchievements")}
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type="checkbox"
                         disabled={this.state.characterConnected ? "" : "disabled"}
                         checked={this.state.disconnectUponFightsLimit}
                         onChange={(event) => {
                           this.setState({disconnectUponFightsLimit: event.target.checked});
                           this.props.account.config.disconnectUponFightsLimit = event.target.checked;
                           this.props.account.config.save();
                         }}/>
                  {LanguageManager.trans("disconnectFightsLimit")}
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type="checkbox"
                         disabled={this.state.characterConnected ? "" : "disabled"}
                         checked={this.state.autoRegenAccepted}
                         onChange={(event) => {
                           this.setState({autoRegenAccepted: event.target.checked});
                           this.props.account.config.autoRegenAccepted = event.target.checked;
                           this.props.account.config.save();
                         }}/>
                  {LanguageManager.trans("autoRegenObjects")}
                </Label>
              </FormGroup>
            </Card>
          </Col>
          <Col>
            <Card body inverse color="dark">
              <CardTitle>{LanguageManager.trans("exchanges")}</CardTitle>
              <FormGroup check>
                <Label check>
                  <Input type="checkbox"
                         disabled={this.state.characterConnected ? "" : "disabled"}
                         checked={this.state.ignoreNonAuthorizedTrades}
                         onChange={(event) => {
                           this.setState({ignoreNonAuthorizedTrades: event.target.checked});
                           this.props.account.config.ignoreNonAuthorizedTrades = event.target.checked;
                           this.props.account.config.save();
                         }}/>
                  {LanguageManager.trans("ignoreNonAuthorizedTrades")}
                </Label>
              </FormGroup>
              <hr/>
              <CardText>{LanguageManager.trans("authorizedPlayers")}</CardText>
              <Table striped bordered size="sm" responsive>
                <thead>
                <tr>
                  <th>ID</th>
                  <th>{LanguageManager.trans("actions")}</th>
                </tr>
                </thead>
                <tbody>
                {this.state.authorizedTradesFrom.map((c, index) => (
                  <tr key={index}>
                    <td>{c}</td>
                    <td>
                      <Button disabled={this.state.characterConnected ? false : true}
                              outline color="danger" size="sm" onClick={() => {
                        this.props.account.config.authorizedTradesFrom = this.props.account.config.authorizedTradesFrom.filter((s) => s !== c);
                        this.props.account.config.save();
                        this.setState({authorizedTradesFrom: this.props.account.config.authorizedTradesFrom});
                      }}>
                        X
                      </Button>
                    </td>
                  </tr>
                ))}
                </tbody>
              </Table>
              <InputGroup>
                <Input
                  disabled={this.state.characterConnected ? "" : "disabled"}
                  type="number" className="form-control-sm" value={this.state.toAddToAuthorized}
                  onChange={(event) => {
                    const value = parseInt(event.target.value, 10);
                    if (!value) {
                      return;
                    }
                    this.setState({toAddToAuthorized: value});
                  }}/>
                <InputGroupAddon addontype="append">
                  <Button disabled={this.state.characterConnected ? false : true}
                          color="light" size="sm" onClick={async () => {
                    this.props.account.config.authorizedTradesFrom.push(this.state.toAddToAuthorized);
                    this.props.account.config.save();
                    this.setState({authorizedTradesFrom: this.props.account.config.authorizedTradesFrom});
                  }}>
                    {LanguageManager.trans("add")}
                  </Button>
                </InputGroupAddon>
              </InputGroup>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }

  private characterSelected() {
    this.setState({
      acceptAchievements: this.props.account.config.acceptAchievements,
      authorizedTradesFrom: this.props.account.config.authorizedTradesFrom,
      autoMount: this.props.account.config.autoMount,
      autoRegenAccepted: this.props.account.config.autoRegenAccepted,
      characterConnected: true,
      disconnectUponFightsLimit: this.props.account.config.disconnectUponFightsLimit,
      enableSpeedHack: this.props.account.config.enableSpeedHack,
      ignoreNonAuthorizedTrades: this.props.account.config.ignoreNonAuthorizedTrades,
      spells: this.props.account.config.spellsToBoost,
      statToBoost: this.props.account.config.statToBoost,
    });
  }

  private boostableStatChanged(e) {
    const value = parseInt(e.target.value, 10);
    this.setState({statToBoost: value});
    this.props.account.config.statToBoost = value;
    this.props.account.config.save();
  }

  private speedhackChanged(e) {
    this.setState({enableSpeedHack: e.target.checked});
    this.props.account.config.enableSpeedHack = e.target.checked;
    this.props.account.config.save();
  }

  private autoMountChanged(e) {
    this.setState({autoMount: e.target.checked});
    this.props.account.config.autoMount = e.target.checked;
    this.props.account.config.save();
  }

  private acceptAchievementsChanged(e) {
    this.setState({acceptAchievements: e.target.checked});
    this.props.account.config.acceptAchievements = e.target.checked;
    this.props.account.config.save();
  }
}
