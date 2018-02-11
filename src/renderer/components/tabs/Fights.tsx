import LanguageManager from "@/configurations/language/LanguageManager";
import {BlockSpectatorScenarios} from "@/extensions/fights/configuration/enums/BlockSpectatorScenarios";
import {FightSpeeds} from "@/extensions/fights/configuration/enums/FightSpeeds";
import {FightStartPlacement} from "@/extensions/fights/configuration/enums/FightStartPlacement";
import {FightTactics} from "@/extensions/fights/configuration/enums/FightTactics";
import {SpellResistances} from "@/extensions/fights/configuration/enums/SpellResistances";
import {SpellTargets} from "@/extensions/fights/configuration/enums/SpellTargets";
import Spell from "@/extensions/fights/configuration/Spell";
import SpellEntry from "@/game/character/SpellEntry";
import Account from "@account";
import classnames from "classnames";
import * as React from "react";
import {
  Alert,
  Button,
  Card,
  CardText,
  CardTitle,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  ListGroup,
  ListGroupItem,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  Table,
  TabPane,
} from "reactstrap";

interface IFightsProps {
  account: Account;
}

interface IAddSpellForm {
  spellId: number;
  target: SpellTargets;
  turns: number;
  relaunchs: number;
  targetHp: number;
  characterHp: number;
  resistance: SpellResistances;
  resistanceValue: number;
  distanceToClosestMonster: number;
  handToHand: boolean;
  aoe: boolean;
  carefulAoe: boolean;
  avoidAllies: boolean;
}

interface IFightsStates {
  activeTab: string;
  addSpellForm: IAddSpellForm;
  approachWhenNoSpellCasted: boolean;
  baseApproachAllMonsters: boolean;
  blockSpectatorScenario: BlockSpectatorScenarios;
  characterConnected: boolean;
  characterSpells: SpellEntry[];
  startPlacement: FightStartPlacement;
  ignoreSummonedEnemies: boolean;
  lockFight: boolean;
  maxCells: number;
  modalInfos: boolean;
  monsterToApproach: number;
  regenEnd: number;
  regenStart: number;
  spellToApproach: number;
  tactic: FightTactics;
  spells: Spell[];
  fightSpeed: FightSpeeds;
}

export default class Fights extends React.Component<IFightsProps, IFightsStates> {

  constructor(props: IFightsProps) {
    super(props);

    this.state = {
      activeTab: "0",
      addSpellForm: {
        aoe: false,
        avoidAllies: false,
        carefulAoe: false,
        characterHp: 100,
        distanceToClosestMonster: 0,
        handToHand: false,
        relaunchs: 1,
        resistance: SpellResistances.EARTH,
        resistanceValue: 100,
        spellId: -1,
        target: SpellTargets.ENEMY,
        targetHp: 100,
        turns: 1,
      },
      approachWhenNoSpellCasted: this.props.account.extensions.fights.config.approachWhenNoSpellCasted,
      baseApproachAllMonsters: this.props.account.extensions.fights.config.baseApproachAllMonsters,
      blockSpectatorScenario: this.props.account.extensions.fights.config.blockSpectatorScenario,
      characterConnected: false,
      characterSpells: [],
      fightSpeed: this.props.account.extensions.fights.config.fightSpeed,
      ignoreSummonedEnemies: this.props.account.extensions.fights.config.ignoreSummonedEnemies,
      lockFight: this.props.account.extensions.fights.config.lockFight,
      maxCells: this.props.account.extensions.fights.config.maxCells,
      modalInfos: false,
      monsterToApproach: this.props.account.extensions.fights.config.monsterToApproach,
      regenEnd: this.props.account.extensions.fights.config.regenEnd,
      regenStart: this.props.account.extensions.fights.config.regenStart,
      spellToApproach: this.props.account.extensions.fights.config.spellToApproach,
      spells: this.props.account.extensions.fights.config.spells,
      startPlacement: this.props.account.extensions.fights.config.startPlacement,
      tactic: this.props.account.extensions.fights.config.tactic,
    };
  }

  public componentDidMount() {
    this.props.account.game.character.CharacterSelected.on(this.characterSelected.bind(this));
    this.props.account.extensions.fights.config.Changed.on(this.configChanged.bind(this));
    this.props.account.game.character.SpellsUpdated.on(this.spellsUpdated.bind(this));
  }

  public componentWillUnmount() {
    this.props.account.game.character.CharacterSelected.off(this.characterSelected.bind(this));
    this.props.account.extensions.fights.config.Changed.off(this.configChanged.bind(this));
    this.props.account.game.character.SpellsUpdated.off(this.spellsUpdated.bind(this));
  }

  public render() {
    return (
      <Container fluid={true}>
        <Row>
          <Nav pills>
            <NavItem>
              <NavLink
                className={classnames({active: this.state.activeTab === "0"})}
                onClick={() => { this.toggle("0"); }}
              >
                General
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({active: this.state.activeTab === "1"})}
                onClick={() => { this.toggle("1"); }}
              >
                {LanguageManager.trans("spells")}
              </NavLink>
            </NavItem>
          </Nav>
        </Row>
        <hr/>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="0">
            <Row>
              <Col>
                <Card body inverse color="dark">
                  <CardTitle>{LanguageManager.trans("warmup")}</CardTitle>
                  <FormGroup>
                    <Label for="startPlacement">{LanguageManager.trans("startPlacement")}</Label>
                    <Input type="select" className="form-control-sm" id="startPlacement"
                           disabled={this.state.characterConnected ? "" : "disabled"}
                           value={this.state.startPlacement}
                           onChange={(event) => this.startPlacementChanged(event)}>
                      <option value={FightStartPlacement.FAR_FROM_ENEMIES}>{LanguageManager.trans("farFromEnemies")}</option>
                      <option value={FightStartPlacement.CLOSE_TO_ENEMIES}>{LanguageManager.trans("closeToEnemies")}</option>
                      <option value={FightStartPlacement.STAY_STILL}>{LanguageManager.trans("stayStill")}</option>
                    </Input>
                  </FormGroup>
                  <FormGroup>
                    <Label for="monsterToApproach">{LanguageManager.trans("approachMonster")}</Label>
                    <Input type="number" className="form-control-sm" id="monsterToApproach"
                           disabled={this.state.characterConnected ? "" : "disabled"}
                           value={this.state.monsterToApproach}
                           onChange={(event) => this.monsterToApproachChanged(event)}>
                    </Input>
                    <Alert color="warning">
                      {LanguageManager.trans("monsterToApproachInfo")}
                    </Alert>
                  </FormGroup>
                  <FormGroup>
                    <Label for="spellToApproach">{LanguageManager.trans("spellToApproach")}</Label>
                    <Input type="number" className="form-control-sm" id="spellToApproach"
                           disabled={this.state.characterConnected ? "" : "disabled"}
                           value={this.state.spellToApproach}
                           onChange={(event) => this.spellToApproachChanged(event)}>
                    </Input>
                    <Alert color="warning">
                      {LanguageManager.trans("spellToApproachInfo")}
                    </Alert>
                  </FormGroup>
                  <FormGroup>
                    <Label for="blockSpectatorScenario">{LanguageManager.trans("blockSpectator")}</Label>
                    <Input type="select" className="form-control-sm" id="blockSpectatorScenario"
                           disabled={this.state.characterConnected ? "" : "disabled"}
                           value={this.state.blockSpectatorScenario}
                           onChange={(event) => this.blockSpectatorScenarioChanged(event)}>
                      <option value={BlockSpectatorScenarios.ALWAYS}>{LanguageManager.trans("always")}</option>
                      <option value={BlockSpectatorScenarios.NEVER}>{LanguageManager.trans("never")}</option>
                      <option value={BlockSpectatorScenarios.WHEN_SOMEONE_JOINS}>{LanguageManager.trans("whenSomeoneJoins")}</option>
                    </Input>
                  </FormGroup>
                  <FormGroup check>
                    <Label check>
                      <Input type="checkbox"
                             disabled={this.state.characterConnected ? "" : "disabled"}
                             checked={this.state.lockFight}
                             onChange={(event) => this.lockFightChanged(event)}/>
                      {LanguageManager.trans("lockFight")}
                    </Label>
                  </FormGroup>
                </Card>
              </Col>
              <Col>
                <Card body inverse color="dark">
                  <CardTitle>{LanguageManager.trans("duringFights")}</CardTitle>
                  <FormGroup>
                    <Label for="tactic">{LanguageManager.trans("tactic")}</Label>
                    <Input type="select" className="form-control-sm" id="tactic"
                           disabled={this.state.characterConnected ? "" : "disabled"}
                           value={this.state.tactic}
                           onChange={(event) => this.tacticChanged(event)}>
                      <option value={FightTactics.AGGRESSIVE}>{LanguageManager.trans("aggressive")}</option>
                      <option value={FightTactics.FUGITIVE}>{LanguageManager.trans("fugitive")}</option>
                      <option value={FightTactics.PASSIVE}>{LanguageManager.trans("passive")}</option>
                    </Input>
                  </FormGroup>
                  <FormGroup>
                    <Label for="fightSpeed">{LanguageManager.trans("fightSpeed")}</Label>
                    <Input type="select" className="form-control-sm" id="fightSpeed"
                           disabled={this.state.characterConnected ? "" : "disabled"}
                           value={this.state.fightSpeed}
                           onChange={(event) => this.fightSpeedChanged(event)}>
                      <option value={FightSpeeds.SUICIDAL}>{LanguageManager.trans("suicidal")}</option>
                      <option value={FightSpeeds.FAST}>{LanguageManager.trans("fast")}</option>
                      <option value={FightSpeeds.NORMAL}>{LanguageManager.trans("normal")}</option>
                    </Input>
                  </FormGroup>
                  <FormGroup>
                    <Label for="maxCells">{LanguageManager.trans("maxCells")}</Label>
                    <Input type="number" className="form-control-sm" id="maxCells"
                           disabled={this.state.characterConnected ? "" : "disabled"}
                           value={this.state.maxCells}
                           onChange={(event) => this.maxCellsChanged(event)}>
                    </Input>
                    <Label for="maxCells">{LanguageManager.trans("maxCells2")}</Label>
                  </FormGroup>
                  <FormGroup check>
                    <Label check>
                      <Input type="checkbox"
                             disabled={this.state.characterConnected ? "" : "disabled"}
                             checked={this.state.approachWhenNoSpellCasted}
                             onChange={(event) => this.approachWhenNoSpellCastedChanged(event)}/>
                      {LanguageManager.trans("approachWhenNoSpellCasted")}
                    </Label>
                  </FormGroup>
                  <FormGroup check>
                    <Label check>
                      <Input type="checkbox"
                             disabled={this.state.characterConnected ? "" : "disabled"}
                             checked={this.state.baseApproachAllMonsters}
                             onChange={(event) => this.baseApproachAllMonstersChanged(event)}/>
                      {LanguageManager.trans("baseApproachAllMonsters")}
                    </Label>
                  </FormGroup>
                  <FormGroup check>
                    <Label check>
                      <Input type="checkbox"
                             disabled={this.state.characterConnected ? "" : "disabled"}
                             checked={this.state.ignoreSummonedEnemies}
                             onChange={(event) => this.ignoreSummonedEnemiesChanged(event)}/>
                      {LanguageManager.trans("ignoreSummonedEnemies")}
                    </Label>
                  </FormGroup>
                </Card>
              </Col>
              <Col>
                <Card body inverse color="dark">
                  <CardTitle>Régénération</CardTitle>
                  <FormGroup>
                    <Label for="regenStart">Minimum</Label>
                    <Input type="number" className="form-control-sm" id="regenStart"
                           disabled={this.state.characterConnected ? "" : "disabled"}
                           value={this.state.regenStart}
                           onChange={(event) => this.regenStartChanged(event)}>
                    </Input>
                  </FormGroup>
                  <FormGroup>
                    <Label for="regenEnd">Maximum</Label>
                    <Input type="number" className="form-control-sm" id="regenEnd"
                           disabled={this.state.characterConnected ? "" : "disabled"}
                           value={this.state.regenEnd}
                           onChange={(event) => this.regenEndChanged(event)}>
                    </Input>
                  </FormGroup>
                </Card>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="1">
            <Row>
              <Col>
                <Table striped bordered size="sm" responsive>
                  <thead>
                  <tr>
                    <th>ID</th>
                    <th>{LanguageManager.trans("name")}</th>
                    <th>{LanguageManager.trans("target")}</th>
                    <th>{LanguageManager.trans("turns")}</th>
                    <th>{LanguageManager.trans("relaunchs")}</th>
                    <th>CAC</th>
                    <th>AOE</th>
                    <th>Actions</th>
                  </tr>
                  </thead>
                  <tbody>
                  {this.state.spells.map((s, index) => (
                    <tr key={index}>
                      <td>{s.spellId}</td>
                      <td>{s.spellName}</td>
                      <td>{SpellTargets[s.target]}</td>
                      <td>{s.turns}</td>
                      <td>{s.relaunchs}</td>
                      <td>{s.handToHand ? LanguageManager.trans("yes") : LanguageManager.trans("no")}</td>
                      <td>{s.aoe ? LanguageManager.trans("yes") : LanguageManager.trans("no")}</td>
                      <td>
                        <Button disabled={this.state.characterConnected ? false : true} size="sm" outline color="danger"
                                onClick={() => {
                                  this.props.account.extensions.fights.config.spells = this.state.spells.filter((sp) => sp.spellId !== s.spellId);
                                  this.props.account.extensions.fights.config.save();
                                }}>
                          X
                        </Button>
                      </td>
                    </tr>
                  ))}
                  </tbody>
                </Table>
                <Card body inverse color="dark" className="clearfix">
                  <CardTitle>
                    <span className="float-left">{LanguageManager.trans("addSpell")}</span>
                    <Button size="sm" color="info" className="float-right" onClick={() => {
                      this.toggleModalInfos();
                    }}>
                      Infos
                    </Button>
                  </CardTitle>
                  <Form onSubmit={async (event) => {
                    event.preventDefault();

                    const infos = this.state.addSpellForm;

                    const name = this.state.characterSpells.find((s) => s.id === infos.spellId).name;

                    const spell = new Spell(infos.spellId, name, infos.target, infos.turns,
                      infos.relaunchs, infos.targetHp, infos.characterHp, infos.resistance,
                      infos.resistanceValue, infos.distanceToClosestMonster, infos.handToHand,
                      infos.aoe, infos.carefulAoe, infos.avoidAllies);

                    this.props.account.extensions.fights.config.spells.push(spell);
                    this.props.account.extensions.fights.config.save();
                  }}>
                    <Row>
                      <Col>
                        <FormGroup>
                          <Label for="spell">{LanguageManager.trans("spell")}</Label>
                          <Input disabled={this.state.characterConnected ? "" : "disabled"}
                                 id="spell"
                                 type="select" className="form-control-sm" value={this.state.addSpellForm.spellId}
                                 onChange={(event) => {
                                   const value = parseInt(event.target.value, 10);
                                   const addSpellForm = Object.assign({}, this.state.addSpellForm);
                                   addSpellForm.spellId = value;
                                   this.setState({addSpellForm});
                                 }}>
                            {this.state.characterSpells.map((s, index) => (
                              <option key={index} value={s.id}>{s.name}</option>
                            ))}
                          </Input>
                        </FormGroup>
                        <FormGroup>
                          <Label for="target">{LanguageManager.trans("target")}</Label>
                          <Input id="target"
                                 disabled={this.state.characterConnected ? "" : "disabled"}
                                 type="select" className="form-control-sm" value={this.state.addSpellForm.target}
                                 onChange={(event) => {
                                   const value = parseInt(event.target.value, 10);
                                   const addSpellForm = Object.assign({}, this.state.addSpellForm);
                                   addSpellForm.target = value;
                                   this.setState({addSpellForm});
                                 }}>
                            <option value={SpellTargets.ALLY}>{LanguageManager.trans("ally")}</option>
                            <option value={SpellTargets.SELF}>{LanguageManager.trans("self")}</option>
                            <option value={SpellTargets.ENEMY}>{LanguageManager.trans("enemy")}</option>
                            <option value={SpellTargets.EMPTY_CELL}>{LanguageManager.trans("emptyCell")}</option>
                          </Input>
                        </FormGroup>
                        <FormGroup>
                          <Label for="turns">{LanguageManager.trans("turns")}</Label>
                          <Input
                            id="turns"
                            disabled={this.state.characterConnected ? "" : "disabled"}
                            type="number" className="form-control-sm" value={this.state.addSpellForm.turns}
                            onChange={(event) => {
                              const value = parseInt(event.target.value, 10);
                              if (!value) {
                                return;
                              }
                              const addSpellForm = Object.assign({}, this.state.addSpellForm);
                              addSpellForm.turns = value;
                              this.setState({addSpellForm});
                            }}/>
                        </FormGroup>
                        <FormGroup>
                          <Label for="relaunchs">{LanguageManager.trans("relaunchs")}</Label>
                          <Input
                            id="relaunchs"
                            disabled={this.state.characterConnected ? "" : "disabled"}
                            type="number" className="form-control-sm" value={this.state.addSpellForm.relaunchs}
                            onChange={(event) => {
                              const value = parseInt(event.target.value, 10);
                              if (!value) {
                                return;
                              }
                              const addSpellForm = Object.assign({}, this.state.addSpellForm);
                              addSpellForm.relaunchs = value;
                              this.setState({addSpellForm});
                            }}/>
                        </FormGroup>
                        <FormGroup>
                          <Label for="targetLife">{LanguageManager.trans("targetLife")} {"<="}</Label>
                          <Input
                            id="targetLife"
                            disabled={this.state.characterConnected ? "" : "disabled"}
                            type="number" className="form-control-sm" value={this.state.addSpellForm.targetHp}
                            onChange={(event) => {
                              const value = parseInt(event.target.value, 10);
                              if (!value || value > 100 || value < 0) {
                                return;
                              }
                              const addSpellForm = Object.assign({}, this.state.addSpellForm);
                              addSpellForm.targetHp = value;
                              this.setState({addSpellForm});
                            }}/>
                        </FormGroup>
                        <FormGroup>
                          <Label for="selfLife">{LanguageManager.trans("selfLife")} {"<="}</Label>
                          <Input
                            id="selfLife"
                            disabled={this.state.characterConnected ? "" : "disabled"}
                            type="number" className="form-control-sm" value={this.state.addSpellForm.characterHp}
                            onChange={(event) => {
                              const value = parseInt(event.target.value, 10);
                              if (!value || value > 100 || value < 0) {
                                return;
                              }
                              const addSpellForm = Object.assign({}, this.state.addSpellForm);
                              addSpellForm.characterHp = value;
                              this.setState({addSpellForm});
                            }}/>
                        </FormGroup>
                      </Col>
                      <Col>
                        <FormGroup>
                          <Label for="resistance">Resistance</Label>
                          <Input
                            id="resistance"
                            disabled={this.state.characterConnected ? "" : "disabled"}
                            type="select" className="form-control-sm" value={this.state.addSpellForm.resistance}
                            onChange={(event) => {
                              const value = parseInt(event.target.value, 10);
                              const addSpellForm = Object.assign({}, this.state.addSpellForm);
                              addSpellForm.resistance = value;
                              this.setState({addSpellForm});
                            }}>
                            <option value={SpellResistances.EARTH}>{LanguageManager.trans("earth")}</option>
                            <option value={SpellResistances.FIRE}>{LanguageManager.trans("fire")}</option>
                            <option value={SpellResistances.NEUTRAL}>{LanguageManager.trans("neutral")}</option>
                            <option value={SpellResistances.WATER}>{LanguageManager.trans("water")}</option>
                            <option value={SpellResistances.WIND}>{LanguageManager.trans("wind")}</option>
                          </Input>
                        </FormGroup>
                        <FormGroup>
                          <Label for="targetResistance">{LanguageManager.trans("targetResistance")} {"<="}</Label>
                          <Input
                            id="targetResistance"
                            disabled={this.state.characterConnected ? "" : "disabled"}
                            type="number" className="form-control-sm" value={this.state.addSpellForm.resistanceValue}
                            onChange={(event) => {
                              const value = parseInt(event.target.value, 10);
                              if (!value || value > 100 || value < 0) {
                                return;
                              }
                              const addSpellForm = Object.assign({}, this.state.addSpellForm);
                              addSpellForm.resistanceValue = value;
                              this.setState({addSpellForm});
                            }}/>
                        </FormGroup>
                        <FormGroup>
                          <Label for="maxDistance">
                            {LanguageManager.trans("maxDistance")} {"<="}
                          </Label>
                          <Input
                            id="maxDistance"
                            disabled={this.state.characterConnected ? "" : "disabled"}
                            type="number" className="form-control-sm" value={this.state.addSpellForm.distanceToClosestMonster}
                            onChange={(event) => {
                              const value = parseInt(event.target.value, 10);
                              if (!value) {
                                return;
                              }
                              const addSpellForm = Object.assign({}, this.state.addSpellForm);
                              addSpellForm.distanceToClosestMonster = value;
                              this.setState({addSpellForm});
                            }}/>
                        </FormGroup>
                        <FormGroup check>
                          <Label check>
                            <Input
                              disabled={this.state.characterConnected ? "" : "disabled"}
                              type="checkbox"
                              checked={this.state.addSpellForm.handToHand}
                              onChange={(event) => {
                                const addSpellForm = Object.assign({}, this.state.addSpellForm);
                                addSpellForm.handToHand = event.target.checked;
                                this.setState({addSpellForm});
                              }}/>
                            {LanguageManager.trans("melee")}
                          </Label>
                        </FormGroup>
                        <FormGroup check>
                          <Label check>
                            <Input
                              disabled={this.state.characterConnected ? "" : "disabled"}
                              type="checkbox"
                              checked={this.state.addSpellForm.aoe}
                              onChange={(event) => {
                                const addSpellForm = Object.assign({}, this.state.addSpellForm);
                                addSpellForm.aoe = event.target.checked;
                                this.setState({addSpellForm});
                              }}/>
                            {LanguageManager.trans("hitManyPossible")}
                          </Label>
                        </FormGroup>
                        <FormGroup check>
                          <Label check>
                            <Input
                              type="checkbox"
                              disabled={this.state.characterConnected && this.state.addSpellForm.aoe ? "" : "disabled"}
                              checked={this.state.addSpellForm.carefulAoe}
                              onChange={(event) => {
                                const addSpellForm = Object.assign({}, this.state.addSpellForm);
                                addSpellForm.carefulAoe = event.target.checked;
                                this.setState({addSpellForm});
                              }}/>
                            {LanguageManager.trans("dontTouchSelf")}
                          </Label>
                        </FormGroup>
                        <FormGroup check>
                          <Label check>
                            <Input
                              type="checkbox"
                              disabled={this.state.characterConnected && this.state.addSpellForm.aoe ? "" : "disabled"}
                              checked={this.state.addSpellForm.avoidAllies}
                              onChange={(event) => {
                                const addSpellForm = Object.assign({}, this.state.addSpellForm);
                                addSpellForm.avoidAllies = event.target.checked;
                                this.setState({addSpellForm});
                              }}/>
                            {LanguageManager.trans("dontTouchAllies")}
                          </Label>
                        </FormGroup>
                        <br/>
                        <Button disabled={this.state.characterConnected ? false : true} size="sm" color="success">{LanguageManager.trans("add")}</Button>
                      </Col>
                    </Row>
                  </Form>
                </Card>
              </Col>
            </Row>
          </TabPane>
        </TabContent>
        <Modal isOpen={this.state.modalInfos} size="lg" toggle={() => this.toggleModalInfos()}>
          <ModalHeader toggle={() => this.toggleModalInfos()}>Infos</ModalHeader>
          <ModalBody>
            <ListGroup>
              <ListGroupItem>{LanguageManager.trans("spellInfo")}</ListGroupItem>
              <ListGroupItem>{LanguageManager.trans("targetInfo")}</ListGroupItem>
              <ListGroupItem>{LanguageManager.trans("turnsInfo")}</ListGroupItem>
              <ListGroupItem>{LanguageManager.trans("castPerTurnInfo")}</ListGroupItem>
              <ListGroupItem>{LanguageManager.trans("targetLifeInfo")}</ListGroupItem>
              <ListGroupItem>{LanguageManager.trans("characterLifeInfo")}</ListGroupItem>
              <ListGroupItem>{LanguageManager.trans("resistanceInfo")}</ListGroupItem>
              <ListGroupItem>{LanguageManager.trans("meleeInfo")}</ListGroupItem>
              <ListGroupItem>{LanguageManager.trans("hitManyPossibleInfo")}</ListGroupItem>
              <ListGroupItem>{LanguageManager.trans("dontTouchSelfInfo")}</ListGroupItem>
              <ListGroupItem>{LanguageManager.trans("dontTouchAlliesInfo")}</ListGroupItem>
            </ListGroup>
          </ModalBody>
          <ModalFooter>
            <Button size="sm" color="dark" onClick={() => this.toggleModalInfos()}>{LanguageManager.trans("close")}</Button>
          </ModalFooter>
        </Modal>
      </Container>
    );
  }

  private configChanged() {
    this.setState({
      approachWhenNoSpellCasted: this.props.account.extensions.fights.config.approachWhenNoSpellCasted,
      baseApproachAllMonsters: this.props.account.extensions.fights.config.baseApproachAllMonsters,
      blockSpectatorScenario: this.props.account.extensions.fights.config.blockSpectatorScenario,
      fightSpeed: this.props.account.extensions.fights.config.fightSpeed,
      ignoreSummonedEnemies: this.props.account.extensions.fights.config.ignoreSummonedEnemies,
      lockFight: this.props.account.extensions.fights.config.lockFight,
      maxCells: this.props.account.extensions.fights.config.maxCells,
      monsterToApproach: this.props.account.extensions.fights.config.monsterToApproach,
      regenEnd: this.props.account.extensions.fights.config.regenEnd,
      regenStart: this.props.account.extensions.fights.config.regenStart,
      spellToApproach: this.props.account.extensions.fights.config.spellToApproach,
      spells: this.props.account.extensions.fights.config.spells,
      startPlacement: this.props.account.extensions.fights.config.startPlacement,
      tactic: this.props.account.extensions.fights.config.tactic,
    });
  }

  private characterSelected() {
    this.setState({characterConnected: true});
  }

  private toggle(tab: string) {
    if (this.state.activeTab !== tab) {
      this.setState({activeTab: tab});
    }
  }

  private toggleModalInfos() {
    this.setState({
      modalInfos: !this.state.modalInfos,
    });
  }

  private ignoreSummonedEnemiesChanged(event) {
    this.setState({
      ignoreSummonedEnemies: event.target.checked,
    });
    this.props.account.extensions.fights.config.ignoreSummonedEnemies = event.target.checked;
    this.props.account.extensions.fights.config.save();
  }

  private approachWhenNoSpellCastedChanged(event) {
    this.setState({
      approachWhenNoSpellCasted: event.target.checked,
    });
    this.props.account.extensions.fights.config.approachWhenNoSpellCasted = event.target.checked;
    this.props.account.extensions.fights.config.save();
  }

  private baseApproachAllMonstersChanged(event) {
    this.setState({
      baseApproachAllMonsters: event.target.checked,
    });
    this.props.account.extensions.fights.config.baseApproachAllMonsters = event.target.checked;
    this.props.account.extensions.fights.config.save();
  }

  private lockFightChanged(event) {
    this.setState({
      lockFight: event.target.checked,
    });
    this.props.account.extensions.fights.config.lockFight = event.target.checked;
    this.props.account.extensions.fights.config.save();
  }

  private tacticChanged(e) {
    const value = parseInt(e.target.value, 10);
    this.setState({tactic: value});
    this.props.account.extensions.fights.config.tactic = value;
    this.props.account.extensions.fights.config.save();
  }

  private fightSpeedChanged(e) {
    const value = parseInt(e.target.value, 10);
    this.setState({fightSpeed: value});
    this.props.account.extensions.fights.config.fightSpeed = value;
    this.props.account.extensions.fights.config.save();
  }

  private startPlacementChanged(e) {
    const value = parseInt(e.target.value, 10);
    this.setState({startPlacement: value});
    this.props.account.extensions.fights.config.startPlacement = value;
    this.props.account.extensions.fights.config.save();
  }

  private blockSpectatorScenarioChanged(e) {
    const value = parseInt(e.target.value, 10);
    this.setState({blockSpectatorScenario: value});
    this.props.account.extensions.fights.config.blockSpectatorScenario = value;
    this.props.account.extensions.fights.config.save();
  }

  private maxCellsChanged(e) {
    const value = parseInt(e.target.value, 10);
    if (!value) {
      return;
    }
    this.setState({maxCells: value});
    this.props.account.extensions.fights.config.maxCells = value;
    this.props.account.extensions.fights.config.save();
  }

  private monsterToApproachChanged(e) {
    const value = parseInt(e.target.value, 10);
    if (!value) {
      return;
    }
    this.setState({monsterToApproach: value});
    this.props.account.extensions.fights.config.monsterToApproach = value;
    this.props.account.extensions.fights.config.save();
  }

  private spellToApproachChanged(e) {
    const value = parseInt(e.target.value, 10);
    if (!value) {
      return;
    }
    this.setState({spellToApproach: value});
    this.props.account.extensions.fights.config.spellToApproach = value;
    this.props.account.extensions.fights.config.save();
  }

  private regenStartChanged(e) {
    const value = parseInt(e.target.value, 10);
    if (!value) {
      return;
    }
    this.setState({regenStart: value});
    this.props.account.extensions.fights.config.regenStart = value;
    this.props.account.extensions.fights.config.save();
  }

  private regenEndChanged(e) {
    const value = parseInt(e.target.value, 10);
    if (!value) {
      return;
    }
    this.setState({regenEnd: value});
    this.props.account.extensions.fights.config.regenEnd = value;
    this.props.account.extensions.fights.config.save();
  }

  private spellsUpdated() {
    this.setState({
      characterSpells: this.props.account.game.character.spells,
    });
    const addSpellForm = Object.assign({}, this.state.addSpellForm);
    addSpellForm.spellId = this.state.characterSpells[0].id;
    this.setState({addSpellForm});
  }
}
