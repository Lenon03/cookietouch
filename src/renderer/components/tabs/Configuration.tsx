import SpellToBoostEntry from "@/account/configurations/SpellToBoostEntry";
import { BlockSpectatorScenarios } from "@/extensions/fights/configuration/enums/BlockSpectatorScenarios";
import { FightSpeeds } from "@/extensions/fights/configuration/enums/FightSpeeds";
import { FightStartPlacement } from "@/extensions/fights/configuration/enums/FightStartPlacement";
import { FightTactics } from "@/extensions/fights/configuration/enums/FightTactics";
import { SpellResistances } from "@/extensions/fights/configuration/enums/SpellResistances";
import { SpellTargets } from "@/extensions/fights/configuration/enums/SpellTargets";
import Spell from "@/extensions/fights/configuration/Spell";
import { BoostableStats } from "@/game/character/BoostableStats";
import Account from "@account";
import * as React from "react";
import { Col, Container, FormGroup, Input, Label, Row } from "reactstrap";

interface IConfigurationProps {
  account: Account;
}

interface IConfigurationStates {
  acceptAchievements: boolean;
  autoMount: boolean;
  characterConnected: boolean;
  enableSpeedHack: boolean;
  statToBoost: number;
}

export default class Configuration extends React.Component<IConfigurationProps, IConfigurationStates> {

  constructor(props: IConfigurationProps) {
    super(props);

    this.state = {
      acceptAchievements: true,
      autoMount: true,
      characterConnected: false,
      enableSpeedHack: false,
      statToBoost: BoostableStats.NONE,
    };

    this.props.account.config.spellsToBoost.push(new SpellToBoostEntry(141, "Pression", 5));

    const spell1 = new Spell(155, "Vitalité", SpellTargets.SELF, 2, 1, 100, 100, SpellResistances.EARTH, 100, 100, false, false, false, false);
    const spell2 = new Spell(158, "Concentration", SpellTargets.ENEMY, 1, 3, 100, 100, SpellResistances.EARTH, 100, 100, false, false, false, false);
    const spell3 = new Spell(141, "Pression", SpellTargets.ENEMY, 1, 2, 100, 100, SpellResistances.EARTH, 100, 100, false, false, false, false);
    const spell4 = new Spell(143, "Intimidation", SpellTargets.ENEMY, 1, 2, 100, 100, SpellResistances.NEUTRAL, 100, 100, false, false, false, false);

    this.props.account.extensions.fights.config.spells = [];
    this.props.account.extensions.fights.config.spells.push(spell1, spell2);

    this.props.account.extensions.fights.config.fightSpeed = FightSpeeds.SUICIDAL;
    this.props.account.extensions.fights.config.startPlacement = FightStartPlacement.CLOSE_TO_ENEMIES;
    this.props.account.extensions.fights.config.monsterToApproach = -1;
    this.props.account.extensions.fights.config.spellToApproach = -1;
    this.props.account.extensions.fights.config.blockSpectatorScenario = BlockSpectatorScenarios.NEVER;
    this.props.account.extensions.fights.config.lockFight = false;
    this.props.account.extensions.fights.config.tactic = FightTactics.AGGRESSIVE;
    this.props.account.extensions.fights.config.maxCells = 4;
    this.props.account.extensions.fights.config.approachWhenNoSpellCasted = true;
    this.props.account.extensions.fights.config.baseApproachAllMonsters = true;
    this.props.account.extensions.fights.config.regenStart = 80;
    this.props.account.extensions.fights.config.regenEnd = 100;
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
            <FormGroup>
              <Label for="boostableStat">Stat to boost</Label>
              <Input type="select" id="boostableStat"
                disabled={this.state.characterConnected ? "" : "disabled"}
                value={this.state.statToBoost}
                onChange={(event) => this.boostableStatChanged(event)}>
                <option value={BoostableStats.NONE}>{BoostableStats[BoostableStats.NONE]}</option>
                <option value={BoostableStats.VITALITY}>{BoostableStats[BoostableStats.VITALITY]}</option>
                <option value={BoostableStats.WISDOM}>{BoostableStats[BoostableStats.WISDOM]}</option>
                <option value={BoostableStats.STRENGTH}>{BoostableStats[BoostableStats.STRENGTH]}</option>
                <option value={BoostableStats.AGILITY}>{BoostableStats[BoostableStats.AGILITY]}</option>
                <option value={BoostableStats.CHANCE}>{BoostableStats[BoostableStats.CHANCE]}</option>
                <option value={BoostableStats.INTELLIGENCE}>{BoostableStats[BoostableStats.INTELLIGENCE]}</option>
              </Input>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input type="checkbox"
                  disabled={this.state.characterConnected ? "" : "disabled"}
                  checked={this.state.enableSpeedHack}
                  onChange={(event) => this.speedhackChanged(event)} />
                SpeedHack
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input type="checkbox"
                  disabled={this.state.characterConnected ? "" : "disabled"}
                  checked={this.state.autoMount}
                  onChange={(event) => this.autoMountChanged(event)} />
                Auto Mount
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input type="checkbox"
                  disabled={this.state.characterConnected ? "" : "disabled"}
                  checked={this.state.acceptAchievements}
                  onChange={(event) => this.acceptAchievementsChanged(event)} />
                Accept Achievements
              </Label>
            </FormGroup>
          </Col>
        </Row>
      </Container>
    );
  }

  private characterSelected() {
    this.setState({
      acceptAchievements: this.props.account.config.acceptAchievements,
      autoMount: this.props.account.config.autoMount,
      characterConnected: true,
      enableSpeedHack: this.props.account.config.enableSpeedHack,
      statToBoost: this.props.account.config.statToBoost,
    });
  }

  private boostableStatChanged(e) {
    const value = parseInt(e.target.value, 10);
    this.setState({ statToBoost: value });
    this.props.account.config.statToBoost = value;
    this.props.account.config.save();
  }

  private speedhackChanged(e) {
    this.setState({
      enableSpeedHack: e.target.checked,
    });
    this.props.account.config.enableSpeedHack = e.target.checked;
    this.props.account.config.save();
  }

  private autoMountChanged(e) {
    this.setState({
      autoMount: e.target.checked,
    });
    this.props.account.config.autoMount = e.target.checked;
    this.props.account.config.save();
  }

  private acceptAchievementsChanged(e) {
    this.setState({
      acceptAchievements: e.target.checked,
    });
    this.props.account.config.acceptAchievements = e.target.checked;
    this.props.account.config.save();
  }
}
