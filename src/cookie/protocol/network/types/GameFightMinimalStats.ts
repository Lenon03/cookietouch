import Type from "./Type";

export default class GameFightMinimalStats extends Type {
  public lifePoints: number;
  public maxLifePoints: number;
  public baseMaxLifePoints: number;
  public permanentDamagePercent: number;
  public shieldPoints: number;
  public actionPoints: number;
  public maxActionPoints: number;
  public movementPoints: number;
  public maxMovementPoints: number;
  public summoner: number;
  public summoned: boolean;
  public neutralElementResistPercent: number;
  public earthElementResistPercent: number;
  public waterElementResistPercent: number;
  public airElementResistPercent: number;
  public fireElementResistPercent: number;
  public neutralElementReduction: number;
  public earthElementReduction: number;
  public waterElementReduction: number;
  public airElementReduction: number;
  public fireElementReduction: number;
  public criticalDamageFixedResist: number;
  public pushDamageFixedResist: number;
  public dodgePALostProbability: number;
  public dodgePMLostProbability: number;
  public tackleBlock: number;
  public tackleEvade: number;
  public invisibilityState: number;

  constructor(lifePoints = 0, maxLifePoints = 0, baseMaxLifePoints = 0,
              permanentDamagePercent = 0, shieldPoints = 0, actionPoints = 0,
              maxActionPoints = 0, movementPoints = 0, maxMovementPoints = 0,
              summoner = 0, summoned = false, neutralElementResistPercent = 0,
              earthElementResistPercent = 0, waterElementResistPercent = 0,
              airElementResistPercent = 0, fireElementResistPercent = 0,
              neutralElementReduction = 0, earthElementReduction = 0,
              waterElementReduction = 0, airElementReduction = 0,
              fireElementReduction = 0, criticalDamageFixedResist = 0,
              pushDamageFixedResist = 0, dodgePALostProbability = 0,
              dodgePMLostProbability = 0, tackleBlock = 0, tackleEvade = 0,
              invisibilityState = 0) {
    super();
    this.lifePoints = lifePoints;
    this.maxLifePoints = maxLifePoints;
    this.baseMaxLifePoints = baseMaxLifePoints;
    this.permanentDamagePercent = permanentDamagePercent;
    this.shieldPoints = shieldPoints;
    this.actionPoints = actionPoints;
    this.maxActionPoints = maxActionPoints;
    this.movementPoints = movementPoints;
    this.maxMovementPoints = maxMovementPoints;
    this.summoner = summoner;
    this.summoned = summoned;
    this.neutralElementResistPercent = neutralElementResistPercent;
    this.earthElementResistPercent = earthElementResistPercent;
    this.waterElementResistPercent = waterElementResistPercent;
    this.airElementResistPercent = airElementResistPercent;
    this.fireElementResistPercent = fireElementResistPercent;
    this.neutralElementReduction = neutralElementReduction;
    this.earthElementReduction = earthElementReduction;
    this.waterElementReduction = waterElementReduction;
    this.airElementReduction = airElementReduction;
    this.fireElementReduction = fireElementReduction;
    this.criticalDamageFixedResist = criticalDamageFixedResist;
    this.pushDamageFixedResist = pushDamageFixedResist;
    this.dodgePALostProbability = dodgePALostProbability;
    this.dodgePMLostProbability = dodgePMLostProbability;
    this.tackleBlock = tackleBlock;
    this.tackleEvade = tackleEvade;
    this.invisibilityState = invisibilityState;

  }
}
