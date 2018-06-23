import Account from "@/account";
import { BlockSpectatorScenarios } from "@/extensions/fights/configuration/enums/BlockSpectatorScenarios";
import { FightSpeeds } from "@/extensions/fights/configuration/enums/FightSpeeds";
import { FightStartPlacement } from "@/extensions/fights/configuration/enums/FightStartPlacement";
import { FightTactics } from "@/extensions/fights/configuration/enums/FightTactics";
import { SpellResistances } from "@/extensions/fights/configuration/enums/SpellResistances";
import { SpellTargets } from "@/extensions/fights/configuration/enums/SpellTargets";
import Spell from "@/extensions/fights/configuration/Spell";
import SpellEntry from "@/game/character/SpellEntry";
import { WithStyles } from "@material-ui/core/styles/withStyles";
import { FightsTabStyle } from "@renderer/pages/tabs/Fights/styles";

export interface IAddSpellForm {
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

export interface IFightsTabProps {
  account: Account;
}

export interface IFightsTabState {
  activeTab: number;
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

export type FightsTabProps = IFightsTabProps & WithStyles<FightsTabStyle>;
