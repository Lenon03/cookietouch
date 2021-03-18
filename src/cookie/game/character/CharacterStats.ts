import CharacterStatsListMessage from "@/protocol/network/messages/CharacterStatsListMessage";
import CharacterBaseCharacteristic from "@/protocol/network/types/CharacterBaseCharacteristic";

export default class CharacterStats {
  public lifePoints: number = 0;
  public maxLifePoints: number = 0;
  public energyPoints: number = 0;
  public maxEnergyPoints: number = 0;
  public experience: number = 0;
  public experienceLevelFloor: number = 0;
  public experienceNextLevelFloor: number = 0;
  public statsPoints: number = 0;
  public spellsPoints: number = 0;
  public actionPoints = new CharacterBaseCharacteristic();
  public movementPoints = new CharacterBaseCharacteristic();
  public initiative = new CharacterBaseCharacteristic();
  public prospecting = new CharacterBaseCharacteristic();
  public range = new CharacterBaseCharacteristic();
  public summonableCreaturesBoost = new CharacterBaseCharacteristic();
  public vitality = new CharacterBaseCharacteristic();
  public wisdom = new CharacterBaseCharacteristic();
  public strength = new CharacterBaseCharacteristic();
  public intelligence = new CharacterBaseCharacteristic();
  public chance = new CharacterBaseCharacteristic();
  public agility = new CharacterBaseCharacteristic();

  public get lifePercent(): number {
    return this.maxLifePoints === 0
      ? 0
      : (this.lifePoints / this.maxLifePoints) * 100;
  }

  public get energyPercent(): number {
    return this.maxEnergyPoints === 0
      ? 0
      : (this.energyPoints / this.maxEnergyPoints) * 100;
  }

  public get experiencePercent(): number {
    return this.experienceNextLevelFloor === 0
      ? 0
      : ((this.experience - this.experienceLevelFloor) /
          (this.experienceNextLevelFloor - this.experienceLevelFloor)) *
          100;
  }

  public UpdateCharacterStatsListMessage(message: CharacterStatsListMessage) {
    this.lifePoints = message.stats.lifePoints;
    this.maxLifePoints = message.stats.maxLifePoints;
    this.energyPoints = message.stats.energyPoints;
    this.maxEnergyPoints = message.stats.maxEnergyPoints;
    this.experience = message.stats.experience;
    this.experienceLevelFloor = message.stats.experienceLevelFloor;
    this.experienceNextLevelFloor = message.stats.experienceNextLevelFloor;
    this.statsPoints = message.stats.statsPoints;
    this.spellsPoints = message.stats.spellsPoints;
    this.actionPoints = message.stats.actionPoints;
    this.movementPoints = message.stats.movementPoints;
    this.initiative = message.stats.initiative;
    this.prospecting = message.stats.prospecting;
    this.range = message.stats.range;
    this.summonableCreaturesBoost = message.stats.summonableCreaturesBoost;
    this.vitality = message.stats.vitality;
    this.wisdom = message.stats.wisdom;
    this.strength = message.stats.strength;
    this.intelligence = message.stats.intelligence;
    this.chance = message.stats.chance;
    this.agility = message.stats.agility;
  }

  public UpdateCharacterExperienceGainMessage(message: any) {
    this.experience += message.experienceCharacter;
  }

  public UpdateLifePointsRegenEndMessage(message: any) {
    this.lifePoints = message.lifePoints;
    this.maxLifePoints = message.maxLifePoints;
  }

  public UpdateUpdateLifePointsMessage(message: any) {
    this.lifePoints = message.lifePoints;
    this.maxLifePoints = message.maxLifePoints;
  }
}
