import ActorExtendedAlignmentInformations from "./ActorExtendedAlignmentInformations";
import CharacterBaseCharacteristic from "./CharacterBaseCharacteristic";
import CharacterSpellModification from "./CharacterSpellModification";

export default class CharacterCharacteristicsInformations {

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
    this.spellModifications = spellModifications;
    this.experience = experience;
    this.experienceLevelFloor = experienceLevelFloor;
    this.experienceNextLevelFloor = experienceNextLevelFloor;
    this.kamas = kamas;
    this.statsPoints = statsPoints;
    this.spellsPoints = spellsPoints;
    this.alignmentInfos = alignmentInfos;
    this.alignmentInfos = alignmentInfos;
    this.lifePoints = lifePoints;
    this.maxLifePoints = maxLifePoints;
    this.energyPoints = energyPoints;
    this.maxEnergyPoints = maxEnergyPoints;
    this.actionPointsCurrent = actionPointsCurrent;
    this.movementPointsCurrent = movementPointsCurrent;
    this.initiative = initiative;
    this.initiative = initiative;
    this.prospecting = prospecting;
    this.prospecting = prospecting;
    this.actionPoints = actionPoints;
    this.actionPoints = actionPoints;
    this.movementPoints = movementPoints;
    this.movementPoints = movementPoints;
    this.strength = strength;
    this.strength = strength;
    this.vitality = vitality;
    this.vitality = vitality;
    this.wisdom = wisdom;
    this.wisdom = wisdom;
    this.chance = chance;
    this.chance = chance;
    this.agility = agility;
    this.agility = agility;
    this.intelligence = intelligence;
    this.intelligence = intelligence;
    this.range = range;
    this.range = range;
    this.summonableCreaturesBoost = summonableCreaturesBoost;
    this.summonableCreaturesBoost = summonableCreaturesBoost;
    this.reflect = reflect;
    this.reflect = reflect;
    this.criticalhit = criticalhit;
    this.criticalhit = criticalhit;
    this.criticalHitWeapon = criticalHitWeapon;
    this.criticalMiss = criticalMiss;
    this.criticalMiss = criticalMiss;
    this.healBonus = healBonus;
    this.healBonus = healBonus;
    this.allDamagesBonus = allDamagesBonus;
    this.allDamagesBonus = allDamagesBonus;
    this.weaponDamagesBonusPercent = weaponDamagesBonusPercent;
    this.weaponDamagesBonusPercent = weaponDamagesBonusPercent;
    this.damagesBonusPercent = damagesBonusPercent;
    this.damagesBonusPercent = damagesBonusPercent;
    this.trapBonus = trapBonus;
    this.trapBonus = trapBonus;
    this.trapBonusPercent = trapBonusPercent;
    this.trapBonusPercent = trapBonusPercent;
    this.glyphBonusPercent = glyphBonusPercent;
    this.glyphBonusPercent = glyphBonusPercent;
    this.permanentDamagePercent = permanentDamagePercent;
    this.permanentDamagePercent = permanentDamagePercent;
    this.tackleBlock = tackleBlock;
    this.tackleBlock = tackleBlock;
    this.tackleEvade = tackleEvade;
    this.tackleEvade = tackleEvade;
    this.pAAttack = pAAttack;
    this.pAAttack = pAAttack;
    this.pMAttack = pMAttack;
    this.pMAttack = pMAttack;
    this.pushDamageBonus = pushDamageBonus;
    this.pushDamageBonus = pushDamageBonus;
    this.criticalDamageBonus = criticalDamageBonus;
    this.criticalDamageBonus = criticalDamageBonus;
    this.neutralDamageBonus = neutralDamageBonus;
    this.neutralDamageBonus = neutralDamageBonus;
    this.earthDamageBonus = earthDamageBonus;
    this.earthDamageBonus = earthDamageBonus;
    this.waterDamageBonus = waterDamageBonus;
    this.waterDamageBonus = waterDamageBonus;
    this.airDamageBonus = airDamageBonus;
    this.airDamageBonus = airDamageBonus;
    this.fireDamageBonus = fireDamageBonus;
    this.fireDamageBonus = fireDamageBonus;
    this.dodgePALostProbability = dodgePALostProbability;
    this.dodgePALostProbability = dodgePALostProbability;
    this.dodgePMLostProbability = dodgePMLostProbability;
    this.dodgePMLostProbability = dodgePMLostProbability;
    this.neutralElementResistPercent = neutralElementResistPercent;
    this.neutralElementResistPercent = neutralElementResistPercent;
    this.earthElementResistPercent = earthElementResistPercent;
    this.earthElementResistPercent = earthElementResistPercent;
    this.waterElementResistPercent = waterElementResistPercent;
    this.waterElementResistPercent = waterElementResistPercent;
    this.airElementResistPercent = airElementResistPercent;
    this.airElementResistPercent = airElementResistPercent;
    this.fireElementResistPercent = fireElementResistPercent;
    this.fireElementResistPercent = fireElementResistPercent;
    this.neutralElementReduction = neutralElementReduction;
    this.neutralElementReduction = neutralElementReduction;
    this.earthElementReduction = earthElementReduction;
    this.earthElementReduction = earthElementReduction;
    this.waterElementReduction = waterElementReduction;
    this.waterElementReduction = waterElementReduction;
    this.airElementReduction = airElementReduction;
    this.airElementReduction = airElementReduction;
    this.fireElementReduction = fireElementReduction;
    this.fireElementReduction = fireElementReduction;
    this.pushDamageReduction = pushDamageReduction;
    this.pushDamageReduction = pushDamageReduction;
    this.criticalDamageReduction = criticalDamageReduction;
    this.criticalDamageReduction = criticalDamageReduction;
    this.pvpNeutralElementResistPercent = pvpNeutralElementResistPercent;
    this.pvpNeutralElementResistPercent = pvpNeutralElementResistPercent;
    this.pvpEarthelementresistpercent = pvpEarthelementresistpercent;
    this.pvpEarthelementresistpercent = pvpEarthelementresistpercent;
    this.pvpWaterElementResistPercent = pvpWaterElementResistPercent;
    this.pvpWaterElementResistPercent = pvpWaterElementResistPercent;
    this.pvpAirElementResistPercent = pvpAirElementResistPercent;
    this.pvpAirElementResistPercent = pvpAirElementResistPercent;
    this.pvpFireElementResistPercent = pvpFireElementResistPercent;
    this.pvpFireElementResistPercent = pvpFireElementResistPercent;
    this.pvpNeutralElementReduction = pvpNeutralElementReduction;
    this.pvpNeutralElementReduction = pvpNeutralElementReduction;
    this.pvpEarthElementReduction = pvpEarthElementReduction;
    this.pvpEarthElementReduction = pvpEarthElementReduction;
    this.pvpWaterElementReduction = pvpWaterElementReduction;
    this.pvpWaterElementReduction = pvpWaterElementReduction;
    this.pvpAirRlementReduction = pvpAirRlementReduction;
    this.pvpAirRlementReduction = pvpAirRlementReduction;
    this.pvpFireElementReduction = pvpFireElementReduction;
    this.pvpFireElementReduction = pvpFireElementReduction;
    this.probationTime = probationTime;
  }
}
