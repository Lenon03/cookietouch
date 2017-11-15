import CharacterBaseCharacteristic from "../../protocol/network/types/CharacterBaseCharacteristic";

export default class CharacterStats {
  public lifePoints: number;
  public maxLifePoints: number;
  public energyPoints: number;
  public maxEnergyPoints: number;
  public experience: number;
  public experienceLevelFloor: number;
  public experienceNextLevelFloor: number;
  public statsPoints: number;
  public spellsPoints: number;
  public actionPoints: CharacterBaseCharacteristic;
  public movementPoints: CharacterBaseCharacteristic;
  public initiative: CharacterBaseCharacteristic;
  public prospecting: CharacterBaseCharacteristic;
  public range: CharacterBaseCharacteristic;
  public summonableCreaturesBoost: CharacterBaseCharacteristic;
  public vitality: CharacterBaseCharacteristic;
  public wisdom: CharacterBaseCharacteristic;
  public strength: CharacterBaseCharacteristic;
  public intelligence: CharacterBaseCharacteristic;
  public chance: CharacterBaseCharacteristic;
  public agility: CharacterBaseCharacteristic;
}
