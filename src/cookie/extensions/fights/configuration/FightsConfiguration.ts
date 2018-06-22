import Account from "@/account";
import { BlockSpectatorScenarios } from "@/extensions/fights/configuration/enums/BlockSpectatorScenarios";
import { FightSpeeds } from "@/extensions/fights/configuration/enums/FightSpeeds";
import { FightStartPlacement } from "@/extensions/fights/configuration/enums/FightStartPlacement";
import { FightTactics } from "@/extensions/fights/configuration/enums/FightTactics";
import Spell from "@/extensions/fights/configuration/Spell";
import LiteEvent from "@/utils/LiteEvent";
import { remote } from "electron";
import * as fs from "fs";
import * as path from "path";

interface IFightsConfigurationJSON {
  approachWhenNoSpellCasted: boolean;
  baseApproachAllMonsters: boolean;
  blockSpectatorScenario: BlockSpectatorScenarios;
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

export default class FightsConfiguration {
  public readonly configurationsPath = "parameters/fights";

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
  public fightSpeed: FightSpeeds;
  private readonly onChanged = new LiteEvent<void>();
  private account: Account;
  private configFilePath = "";

  constructor(account: Account) {
    this.account = account;

    this.startPlacement = FightStartPlacement.FAR_FROM_ENEMIES;
    this.ignoreSummonedEnemies = true;
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
    this.fightSpeed = FightSpeeds.NORMAL;
  }

  public get Changed() {
    return this.onChanged.expose();
  }

  public setConfigFilePath() {
    const folderPath = path.join(
      remote.app.getPath("userData"),
      this.configurationsPath
    );
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }
    this.configFilePath = path.join(
      folderPath,
      `${this.account.accountConfig.username}_${
        this.account.game.character.name
      }.config`
    );
  }

  public load() {
    if (!fs.existsSync(this.configFilePath)) {
      this.save();
      return;
    }
    const data = fs.readFileSync(this.configFilePath);
    const json = JSON.parse(data.toString()) as IFightsConfigurationJSON;
    this.approachWhenNoSpellCasted = json.approachWhenNoSpellCasted;
    this.baseApproachAllMonsters = json.baseApproachAllMonsters;
    this.blockSpectatorScenario = json.blockSpectatorScenario;
    this.fightSpeed = json.fightSpeed;
    this.ignoreSummonedEnemies = json.ignoreSummonedEnemies;
    this.lockFight = json.lockFight;
    this.maxCells = json.maxCells;
    this.monsterToApproach = json.monsterToApproach;
    this.regenEnd = json.regenEnd;
    this.regenStart = json.regenStart;
    this.spellToApproach = json.spellToApproach;
    this.spells = json.spells;
    this.startPlacement = json.startPlacement;
    this.tactic = json.tactic;
    this.onChanged.trigger();
  }

  public save() {
    const toSave: IFightsConfigurationJSON = {
      approachWhenNoSpellCasted: this.approachWhenNoSpellCasted,
      baseApproachAllMonsters: this.baseApproachAllMonsters,
      blockSpectatorScenario: this.blockSpectatorScenario,
      fightSpeed: this.fightSpeed,
      ignoreSummonedEnemies: this.ignoreSummonedEnemies,
      lockFight: this.lockFight,
      maxCells: this.maxCells,
      monsterToApproach: this.monsterToApproach,
      regenEnd: this.regenEnd,
      regenStart: this.regenStart,
      spellToApproach: this.spellToApproach,
      spells: this.spells,
      startPlacement: this.startPlacement,
      tactic: this.tactic
    };
    fs.writeFileSync(this.configFilePath, JSON.stringify(toSave));
    this.onChanged.trigger();
  }
}
