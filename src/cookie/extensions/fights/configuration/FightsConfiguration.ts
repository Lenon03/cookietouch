import Account from "@/account";
import { BlockSpectatorScenarios } from "@/extensions/fights/configuration/enums/BlockSpectatorScenarios";
import { FightSpeeds } from "@/extensions/fights/configuration/enums/FightSpeeds";
import { FightStartPlacement } from "@/extensions/fights/configuration/enums/FightStartPlacement";
import { FightTactics } from "@/extensions/fights/configuration/enums/FightTactics";
import Spell, { ISpell } from "@/extensions/fights/configuration/Spell";
import LiteEvent from "@/utils/LiteEvent";
import firebase from "firebase/app";

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
  spells: ISpell[];
  fightSpeed: FightSpeeds;
}

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
  public fightSpeed: FightSpeeds;

  private authChangedUnsuscribe: firebase.Unsubscribe | undefined;
  private stopDataSnapshot: (() => void) | undefined;

  private globalDoc: firebase.firestore.DocumentReference | undefined;
  private readonly onChanged = new LiteEvent<void>();
  private account: Account;

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
    this.regenStart = 80;
    this.regenEnd = 100;
    this.spells = [];
    this.fightSpeed = FightSpeeds.NORMAL;
  }

  public removeListeners = () => {
    if (this.authChangedUnsuscribe) {
      this.authChangedUnsuscribe();
    }
    if (this.stopDataSnapshot) {
      this.stopDataSnapshot();
    }
  };

  public get Changed() {
    return this.onChanged.expose();
  }

  public async load() {
    this.authChangedUnsuscribe = firebase
      .auth()
      .onAuthStateChanged(async user => {
        if (!user) {
          return;
        }
        this.globalDoc = firebase
          .firestore()
          .doc(
            `users/${user.uid}/config/accounts/${
              this.account.accountConfig.username
            }/characters/${this.account.game.character.name}/fights`
          );

        this.stopDataSnapshot = this.globalDoc.onSnapshot(snapshot => {
          this.updateFields(snapshot);
        });
      });

    if (!this.globalDoc) {
      return;
    }
    const data = await this.globalDoc.get();
    this.updateFields(data);
  }

  public async save() {
    if (!this.globalDoc) {
      return;
    }
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
      spells: this.spells.map(s => s.toJSON()),
      startPlacement: this.startPlacement,
      tactic: this.tactic
    };
    await this.globalDoc.set(toSave);
  }

  private updateFields(snapshot: firebase.firestore.DocumentSnapshot) {
    if (!snapshot.exists) {
      return;
    }
    const json = snapshot.data() as IFightsConfigurationJSON;
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
    this.spells = json.spells.map(s => Spell.fromJSON(s));
    this.startPlacement = json.startPlacement;
    this.tactic = json.tactic;
    this.onChanged.trigger();
  }
}
