import { SpellResistances } from "@/extensions/fights/configuration/enums/SpellResistances";
import { SpellTargets } from "@/extensions/fights/configuration/enums/SpellTargets";

export interface ISpell {
  spellId: number;
  spellName: string;
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

export default class Spell {
  public spellId: number;
  public spellName: string;
  public target: SpellTargets;
  public turns: number;
  public lastTurn: number;
  public relaunchs: number;
  public remainingRelaunchs: number;
  public targetHp: number;
  public characterHp: number;
  public resistance: SpellResistances;
  public resistanceValue: number;
  public distanceToClosestMonster: number;
  public handToHand: boolean;
  public aoe: boolean;
  public carefulAoe: boolean;
  public avoidAllies: boolean;

  constructor(
    spellId: number,
    spellName: string,
    target: SpellTargets,
    turns: number,
    relaunchs: number,
    targetHp: number,
    characterHp: number,
    resistance: SpellResistances,
    resistanceValue: number,
    distanceToClosestMonster: number,
    handToHand: boolean,
    aoe: boolean,
    carefulAoe: boolean,
    avoidAllies: boolean
  ) {
    this.spellId = spellId;
    this.spellName = spellName;
    this.target = target;
    this.turns = turns;
    this.relaunchs = relaunchs;
    this.targetHp = targetHp;
    this.characterHp = characterHp;
    this.resistance = resistance;
    this.resistanceValue = resistanceValue;
    this.distanceToClosestMonster = distanceToClosestMonster;
    this.handToHand = handToHand;
    this.aoe = aoe;
    this.carefulAoe = carefulAoe;
    this.avoidAllies = avoidAllies;
  }

  public toJSON(): ISpell {
    return Object.assign({}, this, {});
  }

  public static fromJSON(json: ISpell | string): Spell {
    if (typeof json === "string") {
      return JSON.parse(json, Spell.reviver);
    } else {
      const spell = Object.create(Spell.prototype);
      // tslint:disable-next-line:prefer-object-spread
      return Object.assign(spell, json, {});
    }
  }

  public static reviver(key: string, value: string): any {
    return key === "" ? Spell.fromJSON(value) : value;
  }
}
