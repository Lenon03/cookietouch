import { BlockSpectatorScenarios } from "./enums/BlockSpectatorScenarios";
import { FightStartPlacement } from "./enums/FightStartPlacement";
import { FightTactics } from "./enums/FightTactics";
import Spell from "./Spell";

export default class FightsConfiguration {
  public approachWhenNoSpellCasted: boolean;
  public baseApproachAllMonsters: boolean;
  public blockSpectatorScenario: BlockSpectatorScenarios;
  public startPlacement: FightStartPlacement;
  public ignoreSummonedEnemies: boolean;
  public lockFight: boolean;
  public maxCells: number;
  public monsterToApproach: number;
  public regenEnd: number;
  public regenStart: number;
  public spellToApproach: number;
  public tactic: FightTactics;
  public spells: Spell[];

  constructor() {
    this.startPlacement = FightStartPlacement.FAR_FROM_ENEMIES;
    this.monsterToApproach = -1;
    this.spellToApproach = -1;
    this.blockSpectatorScenario = BlockSpectatorScenarios.NEVER;
    this.lockFight = false;
    this.tactic = FightTactics.FUGITIVE;
    this.maxCells = 12;
    this.approachWhenNoSpellCasted = false;
    this.baseApproachAllMonsters = false;
    this.regenStart = 0;
    this.regenEnd = 100;
    this.spells = [];
  }
}
