import Account from "@/account";
import { BlockSpectatorScenarios } from "@/extensions/fights/configuration/enums/BlockSpectatorScenarios";
import { FightSpeeds } from "@/extensions/fights/configuration/enums/FightSpeeds";
import { FightStartPlacement } from "@/extensions/fights/configuration/enums/FightStartPlacement";
import { FightTactics } from "@/extensions/fights/configuration/enums/FightTactics";
import { SpellResistances } from "@/extensions/fights/configuration/enums/SpellResistances";
import { SpellTargets } from "@/extensions/fights/configuration/enums/SpellTargets";
import Spell from "@/extensions/fights/configuration/Spell";
import SpellEntry from "@/game/character/SpellEntry";
import { createStyles, Theme, WithStyles } from "@material-ui/core";

export const fightsTabStyles = (theme: Theme) =>
  createStyles({
    appBar: {
      //
    },
    card: {
      margin: 20,
      minWidth: 275
    },
    formControl: {
      margin: theme.spacing.unit,
      width: "100%"
    },
    overflow: {
      maxHeight: 1200,
      overflowY: "auto"
    },
    paper: {
      color: theme.palette.text.secondary,
      margin: theme.spacing.unit,
      minHeight: 800,
      padding: theme.spacing.unit * 2
    },
    root: {
      flexGrow: 1
    },
    selectBlockSpectator: {
      marginTop: 50
    },
    tab: {
      height: 30,
      maxWidth: 1000
    },
    table: {
      heigth: "100%",
      minWidth: 700
    },
    title: {
      color: theme.palette.text.secondary,
      fontSize: 14,
      marginBottom: 16
    }
  });

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

export interface IFightsTabProps extends WithStyles<typeof fightsTabStyles> {
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
  monsterToApproach: number;
  regenEnd: number;
  regenStart: number;
  spellToApproach: number;
  tactic: FightTactics;
  spells: Spell[];
  fightSpeed: FightSpeeds;
}
