import GameFightMinimalStats from "./GameFightMinimalStats";
export default class GameFightMinimalStatsPreparation extends GameFightMinimalStats {
  public initiative: number;
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
              invisibilityState = 0, initiative = 0) {
    super(lifePoints, maxLifePoints, baseMaxLifePoints, permanentDamagePercent,
      shieldPoints, actionPoints, maxActionPoints, movementPoints, maxMovementPoints,
      summoner, summoned, neutralElementResistPercent, earthElementResistPercent,
      waterElementResistPercent, airElementResistPercent, fireElementResistPercent,
      neutralElementReduction, earthElementReduction, waterElementReduction,
      airElementReduction, fireElementReduction, criticalDamageFixedResist,
      pushDamageFixedResist, dodgePALostProbability, dodgePMLostProbability,
      tackleBlock, tackleEvade, invisibilityState);
    this.initiative = initiative;

  }
}
