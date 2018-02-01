import ObjectEffectInteger from "./ObjectEffectInteger";
import Type from "./Type";

export default class MountClientData extends Type {
  public ancestor: number[];
  public behaviors: number[];
  public effectList: ObjectEffectInteger[];
  public id: number;
  public model: number;
  public name: string;
  public sex: boolean;
  public ownerId: number;
  public experience: number;
  public experienceForLevel: number;
  public experienceForNextLevel: number;
  public level: number;
  public isRideable: boolean;
  public maxPods: number;
  public isWild: boolean;
  public stamina: number;
  public staminaMax: number;
  public maturity: number;
  public maturityForAdult: number;
  public energy: number;
  public energyMax: number;
  public serenity: number;
  public aggressivityMax: number;
  public serenityMax: number;
  public love: number;
  public loveMax: number;
  public fecondationTime: number;
  public isFecondationReady: boolean;
  public boostLimiter: number;
  public boostMax: number;
  public reproductionCount: number;
  public reproductionCountMax: number;

  constructor(id = 0, model = 0, name = "", sex = false,
              ownerId = 0, experience = 0, experienceForLevel = 0,
              experienceForNextLevel = 0, level = 0, isRideable = false,
              maxPods = 0, isWild = false, stamina = 0, staminaMax = 0,
              maturity = 0, maturityForAdult = 0, energy = 0, energyMax = 0,
              serenity = 0, aggressivityMax = 0, serenityMax = 0, love = 0,
              loveMax = 0, fecondationTime = 0, isFecondationReady = false,
              boostLimiter = 0, boostMax = 0, reproductionCount = 0,
              reproductionCountMax = 0, ancestor: number[] = null, behaviors: number[] = null,
              effectList: ObjectEffectInteger[] = null) {
    super();
    this.ancestor = ancestor;
    this.behaviors = behaviors;
    this.effectList = effectList;
    this.id = id;
    this.model = model;
    this.name = name;
    this.sex = sex;
    this.ownerId = ownerId;
    this.experience = experience;
    this.experienceForLevel = experienceForLevel;
    this.experienceForNextLevel = experienceForNextLevel;
    this.level = level;
    this.isRideable = isRideable;
    this.maxPods = maxPods;
    this.isWild = isWild;
    this.stamina = stamina;
    this.staminaMax = staminaMax;
    this.maturity = maturity;
    this.maturityForAdult = maturityForAdult;
    this.energy = energy;
    this.energyMax = energyMax;
    this.serenity = serenity;
    this.aggressivityMax = aggressivityMax;
    this.serenityMax = serenityMax;
    this.love = love;
    this.loveMax = loveMax;
    this.fecondationTime = fecondationTime;
    this.isFecondationReady = isFecondationReady;
    this.boostLimiter = boostLimiter;
    this.boostMax = boostMax;
    this.reproductionCount = reproductionCount;
    this.reproductionCountMax = reproductionCountMax;
  }
}
