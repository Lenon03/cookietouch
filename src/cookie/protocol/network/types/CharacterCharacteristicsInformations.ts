import ActorExtendedAlignmentInformations from "@/protocol/network/types/ActorExtendedAlignmentInformations";
import CharacterBaseCharacteristic from "@/protocol/network/types/CharacterBaseCharacteristic";
import CharacterSpellModification from "@/protocol/network/types/CharacterSpellModification";
import Type from "@/protocol/network/types/Type";

export default class CharacterCharacteristicsInformations extends Type {

  public spellModifications: CharacterSpellModification[];
  public experience: number;
  public experienceLevelFloor: number;
  public experienceNextLevelFloor: number;
  public kamas: number;
  public statsPoints: number;
  public spellsPoints: number;
  public alignmentInfos: ActorExtendedAlignmentInformations;
  public lifePoints: number;
  public maxLifePoints: number;
  public energyPoints: number;
  public maxEnergyPoints: number;
  public actionPointsCurrent: number;
  public movementPointsCurrent: number;
  public initiative: CharacterBaseCharacteristic;
  public prospecting: CharacterBaseCharacteristic;
  public actionPoints: CharacterBaseCharacteristic;
  public movementPoints: CharacterBaseCharacteristic;
  public strength: CharacterBaseCharacteristic;
  public vitality: CharacterBaseCharacteristic;
  public wisdom: CharacterBaseCharacteristic;
  public chance: CharacterBaseCharacteristic;
  public agility: CharacterBaseCharacteristic;
  public intelligence: CharacterBaseCharacteristic;
  public range: CharacterBaseCharacteristic;
  public summonableCreaturesBoost: CharacterBaseCharacteristic;
  public reflect: CharacterBaseCharacteristic;
  public criticalhit: CharacterBaseCharacteristic;
  public criticalHitWeapon: number;
  public criticalMiss: CharacterBaseCharacteristic;
  public healBonus: CharacterBaseCharacteristic;
  public allDamagesBonus: CharacterBaseCharacteristic;
  public weaponDamagesBonusPercent: CharacterBaseCharacteristic;
  public damagesBonusPercent: CharacterBaseCharacteristic;
  public trapBonus: CharacterBaseCharacteristic;
  public trapBonusPercent: CharacterBaseCharacteristic;
  public glyphBonusPercent: CharacterBaseCharacteristic;
  public permanentDamagePercent: CharacterBaseCharacteristic;
  public tackleBlock: CharacterBaseCharacteristic;
  public tackleEvade: CharacterBaseCharacteristic;
  public pAAttack: CharacterBaseCharacteristic;
  public pMAttack: CharacterBaseCharacteristic;
  public pushDamageBonus: CharacterBaseCharacteristic;
  public criticalDamageBonus: CharacterBaseCharacteristic;
  public neutralDamageBonus: CharacterBaseCharacteristic;
  public earthDamageBonus: CharacterBaseCharacteristic;
  public waterDamageBonus: CharacterBaseCharacteristic;
  public airDamageBonus: CharacterBaseCharacteristic;
  public fireDamageBonus: CharacterBaseCharacteristic;
  public dodgePALostProbability: CharacterBaseCharacteristic;
  public dodgePMLostProbability: CharacterBaseCharacteristic;
  public neutralElementResistPercent: CharacterBaseCharacteristic;
  public earthElementResistPercent: CharacterBaseCharacteristic;
  public waterElementResistPercent: CharacterBaseCharacteristic;
  public airElementResistPercent: CharacterBaseCharacteristic;
  public fireElementResistPercent: CharacterBaseCharacteristic;
  public neutralElementReduction: CharacterBaseCharacteristic;
  public earthElementReduction: CharacterBaseCharacteristic;
  public waterElementReduction: CharacterBaseCharacteristic;
  public airElementReduction: CharacterBaseCharacteristic;
  public fireElementReduction: CharacterBaseCharacteristic;
  public pushDamageReduction: CharacterBaseCharacteristic;
  public criticalDamageReduction: CharacterBaseCharacteristic;
  public pvpNeutralElementResistPercent: CharacterBaseCharacteristic;
  public pvpEarthelementresistpercent: CharacterBaseCharacteristic;
  public pvpWaterElementResistPercent: CharacterBaseCharacteristic;
  public pvpAirElementResistPercent: CharacterBaseCharacteristic;
  public pvpFireElementResistPercent: CharacterBaseCharacteristic;
  public pvpNeutralElementReduction: CharacterBaseCharacteristic;
  public pvpEarthElementReduction: CharacterBaseCharacteristic;
  public pvpWaterElementReduction: CharacterBaseCharacteristic;
  public pvpAirRlementReduction: CharacterBaseCharacteristic;
  public pvpFireElementReduction: CharacterBaseCharacteristic;
  public probationTime: number;

  constructor(experience = 0, experienceLevelFloor = 0, experienceNextLevelFloor = 0,
              kamas = 0, statsPoints = 0, spellsPoints = 0, alignmentInfos: ActorExtendedAlignmentInformations,
              lifePoints = 0, maxLifePoints = 0, energyPoints = 0, maxEnergyPoints = 0,
              actionPointsCurrent = 0, movementPointsCurrent = 0, initiative: CharacterBaseCharacteristic,
              prospecting: CharacterBaseCharacteristic, actionPoints: CharacterBaseCharacteristic,
              movementPoints: CharacterBaseCharacteristic, strength: CharacterBaseCharacteristic,
              vitality: CharacterBaseCharacteristic, wisdom: CharacterBaseCharacteristic,
              chance: CharacterBaseCharacteristic, agility: CharacterBaseCharacteristic,
              intelligence: CharacterBaseCharacteristic, range: CharacterBaseCharacteristic,
              summonableCreaturesBoost: CharacterBaseCharacteristic, reflect: CharacterBaseCharacteristic,
              criticalhit: CharacterBaseCharacteristic, criticalHitWeapon = 0,
              criticalMiss: CharacterBaseCharacteristic, healBonus: CharacterBaseCharacteristic,
              allDamagesBonus: CharacterBaseCharacteristic, weaponDamagesBonusPercent: CharacterBaseCharacteristic,
              damagesBonusPercent: CharacterBaseCharacteristic, trapBonus: CharacterBaseCharacteristic,
              trapBonusPercent: CharacterBaseCharacteristic, glyphBonusPercent: CharacterBaseCharacteristic,
              permanentDamagePercent: CharacterBaseCharacteristic, tackleBlock: CharacterBaseCharacteristic,
              tackleEvade: CharacterBaseCharacteristic, pAAttack: CharacterBaseCharacteristic,
              pMAttack: CharacterBaseCharacteristic, pushDamageBonus: CharacterBaseCharacteristic,
              criticalDamageBonus: CharacterBaseCharacteristic, neutralDamageBonus: CharacterBaseCharacteristic,
              earthDamageBonus: CharacterBaseCharacteristic, waterDamageBonus: CharacterBaseCharacteristic,
              airDamageBonus: CharacterBaseCharacteristic, fireDamageBonus: CharacterBaseCharacteristic,
              dodgePALostProbability: CharacterBaseCharacteristic, dodgePMLostProbability: CharacterBaseCharacteristic,
              neutralElementResistPercent: CharacterBaseCharacteristic,
              earthElementResistPercent: CharacterBaseCharacteristic,
              waterElementResistPercent: CharacterBaseCharacteristic,
              airElementResistPercent: CharacterBaseCharacteristic,
              fireElementResistPercent: CharacterBaseCharacteristic,
              neutralElementReduction: CharacterBaseCharacteristic,
              earthElementReduction: CharacterBaseCharacteristic,
              waterElementReduction: CharacterBaseCharacteristic,
              airElementReduction: CharacterBaseCharacteristic,
              fireElementReduction: CharacterBaseCharacteristic,
              pushDamageReduction: CharacterBaseCharacteristic,
              criticalDamageReduction: CharacterBaseCharacteristic,
              pvpNeutralElementResistPercent: CharacterBaseCharacteristic,
              pvpEarthelementresistpercent: CharacterBaseCharacteristic,
              pvpWaterElementResistPercent: CharacterBaseCharacteristic,
              pvpAirElementResistPercent: CharacterBaseCharacteristic,
              pvpFireElementResistPercent: CharacterBaseCharacteristic,
              pvpNeutralElementReduction: CharacterBaseCharacteristic,
              pvpEarthElementReduction: CharacterBaseCharacteristic,
              pvpWaterElementReduction: CharacterBaseCharacteristic,
              pvpAirRlementReduction: CharacterBaseCharacteristic,
              pvpFireElementReduction: CharacterBaseCharacteristic,
              probationTime = 0, spellModifications: CharacterSpellModification[]) {
    super();
    this.spellModifications = spellModifications;
    this.experience = experience;
    this.experienceLevelFloor = experienceLevelFloor;
    this.experienceNextLevelFloor = experienceNextLevelFloor;
    this.kamas = kamas;
    this.statsPoints = statsPoints;
    this.spellsPoints = spellsPoints;
    this.alignmentInfos = alignmentInfos;
    this.lifePoints = lifePoints;
    this.maxLifePoints = maxLifePoints;
    this.energyPoints = energyPoints;
    this.maxEnergyPoints = maxEnergyPoints;
    this.actionPointsCurrent = actionPointsCurrent;
    this.movementPointsCurrent = movementPointsCurrent;
    this.initiative = initiative;
    this.prospecting = prospecting;
    this.actionPoints = actionPoints;
    this.movementPoints = movementPoints;
    this.strength = strength;
    this.vitality = vitality;
    this.wisdom = wisdom;
    this.chance = chance;
    this.agility = agility;
    this.intelligence = intelligence;
    this.range = range;
    this.summonableCreaturesBoost = summonableCreaturesBoost;
    this.reflect = reflect;
    this.criticalhit = criticalhit;
    this.criticalHitWeapon = criticalHitWeapon;
    this.criticalMiss = criticalMiss;
    this.healBonus = healBonus;
    this.allDamagesBonus = allDamagesBonus;
    this.weaponDamagesBonusPercent = weaponDamagesBonusPercent;
    this.damagesBonusPercent = damagesBonusPercent;
    this.trapBonus = trapBonus;
    this.trapBonusPercent = trapBonusPercent;
    this.glyphBonusPercent = glyphBonusPercent;
    this.permanentDamagePercent = permanentDamagePercent;
    this.tackleBlock = tackleBlock;
    this.tackleEvade = tackleEvade;
    this.pAAttack = pAAttack;
    this.pMAttack = pMAttack;
    this.pushDamageBonus = pushDamageBonus;
    this.criticalDamageBonus = criticalDamageBonus;
    this.neutralDamageBonus = neutralDamageBonus;
    this.earthDamageBonus = earthDamageBonus;
    this.waterDamageBonus = waterDamageBonus;
    this.airDamageBonus = airDamageBonus;
    this.fireDamageBonus = fireDamageBonus;
    this.dodgePALostProbability = dodgePALostProbability;
    this.dodgePMLostProbability = dodgePMLostProbability;
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
    this.pushDamageReduction = pushDamageReduction;
    this.criticalDamageReduction = criticalDamageReduction;
    this.pvpNeutralElementResistPercent = pvpNeutralElementResistPercent;
    this.pvpEarthelementresistpercent = pvpEarthelementresistpercent;
    this.pvpWaterElementResistPercent = pvpWaterElementResistPercent;
    this.pvpAirElementResistPercent = pvpAirElementResistPercent;
    this.pvpFireElementResistPercent = pvpFireElementResistPercent;
    this.pvpNeutralElementReduction = pvpNeutralElementReduction;
    this.pvpEarthElementReduction = pvpEarthElementReduction;
    this.pvpWaterElementReduction = pvpWaterElementReduction;
    this.pvpAirRlementReduction = pvpAirRlementReduction;
    this.pvpFireElementReduction = pvpFireElementReduction;
    this.probationTime = probationTime;
  }
}
