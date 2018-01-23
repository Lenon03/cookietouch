import { BlockSpectatorScenarios } from "@/extensions/fights/configuration/enums/BlockSpectatorScenarios";
import { FightSpeeds } from "@/extensions/fights/configuration/enums/FightSpeeds";
import { FightStartPlacement } from "@/extensions/fights/configuration/enums/FightStartPlacement";
import { FightTactics } from "@/extensions/fights/configuration/enums/FightTactics";
import { SpellResistances } from "@/extensions/fights/configuration/enums/SpellResistances";
import { SpellTargets } from "@/extensions/fights/configuration/enums/SpellTargets";
import Spell from "@/extensions/fights/configuration/Spell";
import SpellEntry from "@/game/character/SpellEntry";
import DataManager from "@/protocol/data";
import Spells from "@/protocol/data/classes/Spells";
import Account from "@account";
import classnames from "classnames";
import * as React from "react";
import {
  Alert, Button, Card, CardText,
  CardTitle, Col, Container, Form, FormGroup, Input, Label, ListGroup, ListGroupItem, Modal,
  ModalBody, ModalFooter, ModalHeader, Nav, NavItem, NavLink, Row, TabContent, Table, TabPane,
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
      <Container>
        <Row>
          <Nav pills>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === "0" })}
                onClick={() => { this.toggle("0"); }}
              >
                General
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === "1" })}
                onClick={() => { this.toggle("1"); }}
              >
                Sorts
              </NavLink>
            </NavItem>
          </Nav>
        </Row>
        <hr />
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="0">
            <Row>
              <Col>
                <Card body inverse color="dark">
                  <CardTitle>Préparation</CardTitle>
                  <FormGroup>
                    <Label for="startPlacement">Start placement</Label>
                    <Input type="select" className="form-control-sm" id="startPlacement"
disabled={this.state.characterConnected ? "" : "disabled"}
                      value={this.state.startPlacement}
                      onChange={(event) => this.startPlacementChanged(event)}>
                      <option value={FightStartPlacement.FAR_FROM_ENEMIES}>{FightStartPlacement[FightStartPlacement.FAR_FROM_ENEMIES]}</option>
                      <option value={FightStartPlacement.CLOSE_TO_ENEMIES}>{FightStartPlacement[FightStartPlacement.CLOSE_TO_ENEMIES]}</option>
                      <option value={FightStartPlacement.STAY_STILL}>{FightStartPlacement[FightStartPlacement.STAY_STILL]}</option>
                    </Input>
                  </FormGroup>
                  <FormGroup>
                    <Label for="monsterToApproach">S'approcher vers le monstre</Label>
                    <Input type="number" className="form-control-sm" id="monsterToApproach"
                    disabled={this.state.characterConnected ? "" : "disabled"}
                      value={this.state.monsterToApproach}
                      onChange={(event) => this.monsterToApproachChanged(event)}>
                    </Input>
                    <Alert color="warning">
                      Mettez l'ID du monstre que vous voulez approcher au début du combat, si le monstre n'est pas dans le combat l'option sera ignorée.
                    </Alert>
                  </FormGroup>
                  <FormGroup>
                    <Label for="spellToApproach">S'approcher pour lancer le sort</Label>
                    <Input type="number" className="form-control-sm" id="spellToApproach"
                    disabled={this.state.characterConnected ? "" : "disabled"}
                      value={this.state.spellToApproach}
                      onChange={(event) => this.spellToApproachChanged(event)}>
                    </Input>
                    <Alert color="warning">
                      Le personnage essayera de s'approcher pour lancer le sort choisit. S'il ne peut pas il se placera normalement.
                    </Alert>
                  </FormGroup>
                  <FormGroup>
                    <Label for="blockSpectatorScenario">Bloquer le mode spectateur</Label>
                    <Input type="select" className="form-control-sm" id="blockSpectatorScenario"
                    disabled={this.state.characterConnected ? "" : "disabled"}
                      value={this.state.blockSpectatorScenario}
                      onChange={(event) => this.blockSpectatorScenarioChanged(event)}>
                      <option value={BlockSpectatorScenarios.ALWAYS}>{BlockSpectatorScenarios[BlockSpectatorScenarios.ALWAYS]}</option>
                      <option value={BlockSpectatorScenarios.NEVER}>{BlockSpectatorScenarios[BlockSpectatorScenarios.NEVER]}</option>
                      <option value={BlockSpectatorScenarios.WHEN_SOMEONE_JOINS}>
                        {BlockSpectatorScenarios[BlockSpectatorScenarios.WHEN_SOMEONE_JOINS]}
                      </option>
                    </Input>
                  </FormGroup>
                  <FormGroup check>
                    <Label check>
                      <Input type="checkbox"
                      disabled={this.state.characterConnected ? "" : "disabled"}
                        checked={this.state.lockFight}
                        onChange={(event) => this.lockFightChanged(event)} />
                      Bloquer le combat
                    </Label>
                  </FormGroup>
                </Card>
              </Col>
              <Col>
                <Card body inverse color="dark">
                  <CardTitle>Durant le combat</CardTitle>
                  <FormGroup>
                    <Label for="tactic">Tactique</Label>
                    <Input type="select" className="form-control-sm" id="tactic"
                    disabled={this.state.characterConnected ? "" : "disabled"}
                      value={this.state.tactic}
                      onChange={(event) => this.tacticChanged(event)}>
                      <option value={FightTactics.AGGRESSIVE}>{FightTactics[FightTactics.AGGRESSIVE]}</option>
                      <option value={FightTactics.FUGITIVE}>{FightTactics[FightTactics.FUGITIVE]}</option>
                      <option value={FightTactics.PASSIVE}>{FightTactics[FightTactics.PASSIVE]}</option>
                    </Input>
                  </FormGroup>
                  <FormGroup>
                    <Label for="fightSpeed">Vitesse des combats</Label>
                    <Input type="select" className="form-control-sm" id="fightSpeed"
                    disabled={this.state.characterConnected ? "" : "disabled"}
                      value={this.state.fightSpeed}
                      onChange={(event) => this.fightSpeedChanged(event)}>
                      <option value={FightSpeeds.SUICIDAL}>{FightSpeeds[FightSpeeds.SUICIDAL]}</option>
                      <option value={FightSpeeds.FAST}>{FightSpeeds[FightSpeeds.FAST]}</option>
                      <option value={FightSpeeds.NORMAL}>{FightSpeeds[FightSpeeds.NORMAL]}</option>
                    </Input>
                  </FormGroup>
                  <FormGroup>
                    <Label for="maxCells">S'approcher si on est à plus de</Label>
                    <Input type="number" className="form-control-sm" id="maxCells"
                    disabled={this.state.characterConnected ? "" : "disabled"}
                      value={this.state.maxCells}
                      onChange={(event) => this.maxCellsChanged(event)}>
                    </Input>
                    <Label for="maxCells">cases de l'ennemi le plus proche.</Label>
                  </FormGroup>
                  <FormGroup check>
                    <Label check>
                      <Input type="checkbox"
                      disabled={this.state.characterConnected ? "" : "disabled"}
                        checked={this.state.approachWhenNoSpellCasted}
                        onChange={(event) => this.approachWhenNoSpellCastedChanged(event)} />
                      S'approcher si aucun sorts n'a été lancé
                    </Label>
                  </FormGroup>
                  <FormGroup check>
                    <Label check>
                      <Input type="checkbox"
                      disabled={this.state.characterConnected ? "" : "disabled"}
                        checked={this.state.baseApproachAllMonsters}
                        onChange={(event) => this.baseApproachAllMonstersChanged(event)} />
                      Se baser sur tous les monstres quand on veut s'approcher (Tactique aggressive)
                    </Label>
                  </FormGroup>
                  <FormGroup check>
                    <Label check>
                      <Input type="checkbox"
                      disabled={this.state.characterConnected ? "" : "disabled"}
                        checked={this.state.ignoreSummonedEnemies}
                        onChange={(event) => this.ignoreSummonedEnemiesChanged(event)} />
                      Ignorer les invocations
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
                      <th>Name</th>
                      <th>Cible</th>
                      <th>Tours</th>
                      <th>Relances</th>
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
                        <td>{s.handToHand ? "oui" : "non"}</td>
                        <td>{s.aoe ? "oui" : "non"}</td>
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
                    <span className="float-left">Ajouter un sort</span>
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
                          <Label for="spell">Spell</Label>
                          <Input disabled={this.state.characterConnected ? "" : "disabled"}
                            type="select" className="form-control-sm" value={this.state.addSpellForm.spellId}
                            onChange={(event) => {
                              const value = parseInt(event.target.value, 10);
                              const addSpellForm = Object.assign({}, this.state.addSpellForm);
                              addSpellForm.spellId = value;
                              this.setState({ addSpellForm });
                            }}>
                            {this.state.characterSpells.map((s, index) => (
                              <option key={index} value={s.id}>{s.name}</option>
                            ))}
                          </Input>
                        </FormGroup>
                        <FormGroup>
                          <Label for="target">Target</Label>
                          <Input
                          disabled={this.state.characterConnected ? "" : "disabled"}
                            type="select" className="form-control-sm" value={this.state.addSpellForm.target}
                            onChange={(event) => {
                              const value = parseInt(event.target.value, 10);
                              const addSpellForm = Object.assign({}, this.state.addSpellForm);
                              addSpellForm.target = value;
                              this.setState({ addSpellForm });
                            }}>
                            <option value={SpellTargets.ALLY}>{SpellTargets[SpellTargets.ALLY]}</option>
                            <option value={SpellTargets.SELF}>{SpellTargets[SpellTargets.SELF]}</option>
                            <option value={SpellTargets.ENEMY}>{SpellTargets[SpellTargets.ENEMY]}</option>
                            <option value={SpellTargets.EMPTY_CELL}>{SpellTargets[SpellTargets.EMPTY_CELL]}</option>
                          </Input>
                        </FormGroup>
                        <FormGroup>
                          <Label for="turns">Turns</Label>
                          <Input
                          disabled={this.state.characterConnected ? "" : "disabled"}
                            type="number" className="form-control-sm" value={this.state.addSpellForm.turns}
                            onChange={(event) => {
                              const value = parseInt(event.target.value, 10);
                              if (!value) { return; }
                              const addSpellForm = Object.assign({}, this.state.addSpellForm);
                              addSpellForm.turns = value;
                              this.setState({ addSpellForm });
                            }} />
                        </FormGroup>
                        <FormGroup>
                          <Label for="relaunchs">Relaunchs</Label>
                          <Input
                            disabled={this.state.characterConnected ? "" : "disabled"}
                            type="number" className="form-control-sm" value={this.state.addSpellForm.relaunchs}
                            onChange={(event) => {
                              const value = parseInt(event.target.value, 10);
                              if (!value) { return; }
                              const addSpellForm = Object.assign({}, this.state.addSpellForm);
                              addSpellForm.relaunchs = value;
                              this.setState({ addSpellForm });
                            }} />
                        </FormGroup>
                        <FormGroup>
                          <Label for="targetLife">{"Target Life <="}</Label>
                          <Input
                          disabled={this.state.characterConnected ? "" : "disabled"}
                          type="number" className="form-control-sm" value={this.state.addSpellForm.targetHp}
                            onChange={(event) => {
                              const value = parseInt(event.target.value, 10);
                              if (!value || value > 100 || value < 0) { return; }
                              const addSpellForm = Object.assign({}, this.state.addSpellForm);
                              addSpellForm.targetHp = value;
                              this.setState({ addSpellForm });
                            }} />
                        </FormGroup>
                        <FormGroup>
                          <Label for="selfLife">{"Self Life <="}</Label>
                          <Input
                          disabled={this.state.characterConnected ? "" : "disabled"}
                          type="number" className="form-control-sm" value={this.state.addSpellForm.characterHp}
                            onChange={(event) => {
                              const value = parseInt(event.target.value, 10);
                              if (!value || value > 100 || value < 0) { return; }
                              const addSpellForm = Object.assign({}, this.state.addSpellForm);
                              addSpellForm.characterHp = value;
                              this.setState({ addSpellForm });
                            }} />
                        </FormGroup>
                      </Col>
                      <Col>
                        <FormGroup>
                          <Label for="resistance">Resistance</Label>
                          <Input
                            disabled={this.state.characterConnected ? "" : "disabled"}
                            type="select" className="form-control-sm" value={this.state.addSpellForm.resistance}
                            onChange={(event) => {
                              const value = parseInt(event.target.value, 10);
                              const addSpellForm = Object.assign({}, this.state.addSpellForm);
                              addSpellForm.resistance = value;
                              this.setState({ addSpellForm });
                            }}>
                            <option value={SpellResistances.EARTH}>{SpellResistances[SpellResistances.EARTH]}</option>
                            <option value={SpellResistances.FIRE}>{SpellResistances[SpellResistances.FIRE]}</option>
                            <option value={SpellResistances.NEUTRAL}>{SpellResistances[SpellResistances.NEUTRAL]}</option>
                            <option value={SpellResistances.WATER}>{SpellResistances[SpellResistances.WATER]}</option>
                            <option value={SpellResistances.WIND}>{SpellResistances[SpellResistances.WIND]}</option>
                          </Input>
                        </FormGroup>
                        <FormGroup>
                          <Label for="targetResistance">{"de la cible <="}</Label>
                          <Input
                            disabled={this.state.characterConnected ? "" : "disabled"}
                            type="number" className="form-control-sm" value={this.state.addSpellForm.resistanceValue}
                            onChange={(event) => {
                              const value = parseInt(event.target.value, 10);
                              if (!value || value > 100 || value < 0) { return; }
                              const addSpellForm = Object.assign({}, this.state.addSpellForm);
                              addSpellForm.resistanceValue = value;
                              this.setState({ addSpellForm });
                            }} />
                        </FormGroup>
                        <FormGroup>
                          <Label for="maxDistance">
                            Distance entre nous et la cible la plus proche {"<="}
                          </Label>
                          <Input
                            disabled={this.state.characterConnected ? "" : "disabled"}
                            type="number" className="form-control-sm" value={this.state.addSpellForm.distanceToClosestMonster}
                            onChange={(event) => {
                              const value = parseInt(event.target.value, 10);
                              if (!value) { return; }
                              const addSpellForm = Object.assign({}, this.state.addSpellForm);
                              addSpellForm.distanceToClosestMonster = value;
                              this.setState({ addSpellForm });
                            }} />
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
                                this.setState({ addSpellForm });
                              }} />
                            Corps à corps
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
                                this.setState({ addSpellForm });
                              }} />
                            Toucher le plus d'enemies possible
                          </Label>
                        </FormGroup>
                        <FormGroup check>
                          <Label check>
                            <Input
                              type="checkbox"
                              disabled={this.state.characterConnected  && this.state.addSpellForm.aoe ? "" : "disabled"}
                              checked={this.state.addSpellForm.carefulAoe}
                              onChange={(event) => {
                                const addSpellForm = Object.assign({}, this.state.addSpellForm);
                                addSpellForm.carefulAoe = event.target.checked;
                                this.setState({ addSpellForm });
                              }} />
                            Ne pas se toucher
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
                                this.setState({ addSpellForm });
                              }} />
                            Ne pas toucher les alliés
                          </Label>
                        </FormGroup>
                        <br />
                        <Button disabled={this.state.characterConnected ? false : true} size="sm" color="success">Ajouter</Button>
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
              <ListGroupItem>
                Sort: Le sort à lancer
              </ListGroupItem>
              <ListGroupItem>
                Cible: Ennemi, allié, sois-même ou case vide
              </ListGroupItem>
              <ListGroupItem>
                Tours: Le nombre de tours à attendre après chaque relance (1 = lancer tous les tours)
              </ListGroupItem>
              <ListGroupItem>
                Relances: Le nombre de relances par tour
              </ListGroupItem>
              <ListGroupItem>
                Vie de la cible: Lance le sort sur la cible seulement si ses points de vie sont inferieurs ou égaux à ce nombre, en pourcentage
              </ListGroupItem>
              <ListGroupItem>
                Vie du personnage: Lance le sort sur la cible seulement si nos points de vie sont inferieurs ou égaux à ce nombre, en pourcentage
              </ListGroupItem>
              <ListGroupItem>
                Résistance: Lance le sort uniquement si la resistance choisie de la cible est inférieure ou égale à la valeur (en pourcentage)
              </ListGroupItem>
              <ListGroupItem>
                Corps à corps: Lance le sort uniquement si notre personnage est en corps à corps avec un ennemi (ou plusieurs)
              </ListGroupItem>
              <ListGroupItem>
                Toucher le plus d'ennemis possible: Si ce sort est une attaque en zone, cocher cette case permet donc de toucher le plus d'ennemis possible
              </ListGroupItem>
              <ListGroupItem>
                Ne pas se toucher: Pour tous sorts de zones, indique si on permet de toucher son personnage ou pas
              </ListGroupItem>
              <ListGroupItem>
                Ne pas toucher ses alliés: Pour tous sorts de zones, indique si on permet de toucher nos alliés ou pas
              </ListGroupItem>
            </ListGroup>
          </ModalBody>
          <ModalFooter>
            <Button size="sm" color="dark" onClick={() => this.toggleModalInfos()}>Close</Button>
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
    this.setState({ characterConnected: true });
  }

  private toggle(tab: string) {
    if (this.state.activeTab !== tab) {
      this.setState({ activeTab: tab });
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
    this.setState({ tactic: value });
    this.props.account.extensions.fights.config.tactic = value;
    this.props.account.extensions.fights.config.save();
  }

  private fightSpeedChanged(e) {
    const value = parseInt(e.target.value, 10);
    this.setState({ fightSpeed: value });
    this.props.account.extensions.fights.config.fightSpeed = value;
    this.props.account.extensions.fights.config.save();
  }

  private startPlacementChanged(e) {
    const value = parseInt(e.target.value, 10);
    this.setState({ startPlacement: value });
    this.props.account.extensions.fights.config.startPlacement = value;
    this.props.account.extensions.fights.config.save();
  }

  private blockSpectatorScenarioChanged(e) {
    const value = parseInt(e.target.value, 10);
    this.setState({ blockSpectatorScenario: value });
    this.props.account.extensions.fights.config.blockSpectatorScenario = value;
    this.props.account.extensions.fights.config.save();
  }

  private maxCellsChanged(e) {
    const value = parseInt(e.target.value, 10);
    if (!value) { return; }
    this.setState({ maxCells: value });
    this.props.account.extensions.fights.config.maxCells = value;
    this.props.account.extensions.fights.config.save();
  }

  private monsterToApproachChanged(e) {
    const value = parseInt(e.target.value, 10);
    if (!value) { return; }
    this.setState({ monsterToApproach: value });
    this.props.account.extensions.fights.config.monsterToApproach = value;
    this.props.account.extensions.fights.config.save();
  }

  private spellToApproachChanged(e) {
    const value = parseInt(e.target.value, 10);
    if (!value) { return; }
    this.setState({ spellToApproach: value });
    this.props.account.extensions.fights.config.spellToApproach = value;
    this.props.account.extensions.fights.config.save();
  }

  private regenStartChanged(e) {
    const value = parseInt(e.target.value, 10);
    if (!value) { return; }
    this.setState({ regenStart: value });
    this.props.account.extensions.fights.config.regenStart = value;
    this.props.account.extensions.fights.config.save();
  }

  private regenEndChanged(e) {
    const value = parseInt(e.target.value, 10);
    if (!value) { return; }
    this.setState({ regenEnd: value });
    this.props.account.extensions.fights.config.regenEnd = value;
    this.props.account.extensions.fights.config.save();
  }

  private spellsUpdated() {
    this.setState({
      characterSpells: this.props.account.game.character.spells,
    });
    const addSpellForm = Object.assign({}, this.state.addSpellForm);
    addSpellForm.spellId = this.state.characterSpells[0].id;
    this.setState({ addSpellForm });
  }
}
