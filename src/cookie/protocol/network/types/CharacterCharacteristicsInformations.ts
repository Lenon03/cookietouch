import ActorExtendedAlignmentInformations from "./ActorExtendedAlignmentInformations";
import CharacterBaseCharacteristic from "./CharacterBaseCharacteristic";
import CharacterSpellModification from "./CharacterSpellModification";

export default class CharacterCharacteristicsInformations {

  public spellmodifications: CharacterSpellModification[];
  public experience: number;
  public experiencelevelfloor: number;
  public experiencenextlevelfloor: number;
  public kamas: number;
  public statspoints: number;
  public spellspoints: number;
  public alignmentinfos: ActorExtendedAlignmentInformations;
  public lifepoints: number;
  public maxlifepoints: number;
  public energypoints: number;
  public maxenergypoints: number;
  public actionpointscurrent: number;
  public movementpointscurrent: number;
  public initiative: CharacterBaseCharacteristic;
  public prospecting: CharacterBaseCharacteristic;
  public actionpoints: CharacterBaseCharacteristic;
  public movementpoints: CharacterBaseCharacteristic;
  public strength: CharacterBaseCharacteristic;
  public vitality: CharacterBaseCharacteristic;
  public wisdom: CharacterBaseCharacteristic;
  public chance: CharacterBaseCharacteristic;
  public agility: CharacterBaseCharacteristic;
  public intelligence: CharacterBaseCharacteristic;
  public range: CharacterBaseCharacteristic;
  public summonablecreaturesboost: CharacterBaseCharacteristic;
  public reflect: CharacterBaseCharacteristic;
  public criticalhit: CharacterBaseCharacteristic;
  public criticalhitweapon: number;
  public criticalmiss: CharacterBaseCharacteristic;
  public healbonus: CharacterBaseCharacteristic;
  public alldamagesbonus: CharacterBaseCharacteristic;
  public weapondamagesbonuspercent: CharacterBaseCharacteristic;
  public damagesbonuspercent: CharacterBaseCharacteristic;
  public trapbonus: CharacterBaseCharacteristic;
  public trapbonuspercent: CharacterBaseCharacteristic;
  public glyphbonuspercent: CharacterBaseCharacteristic;
  public permanentdamagepercent: CharacterBaseCharacteristic;
  public tackleblock: CharacterBaseCharacteristic;
  public tackleevade: CharacterBaseCharacteristic;
  public paattack: CharacterBaseCharacteristic;
  public pmattack: CharacterBaseCharacteristic;
  public pushdamagebonus: CharacterBaseCharacteristic;
  public criticaldamagebonus: CharacterBaseCharacteristic;
  public neutraldamagebonus: CharacterBaseCharacteristic;
  public earthdamagebonus: CharacterBaseCharacteristic;
  public waterdamagebonus: CharacterBaseCharacteristic;
  public airdamagebonus: CharacterBaseCharacteristic;
  public firedamagebonus: CharacterBaseCharacteristic;
  public dodgepalostprobability: CharacterBaseCharacteristic;
  public dodgepmlostprobability: CharacterBaseCharacteristic;
  public neutralelementresistpercent: CharacterBaseCharacteristic;
  public earthelementresistpercent: CharacterBaseCharacteristic;
  public waterelementresistpercent: CharacterBaseCharacteristic;
  public airelementresistpercent: CharacterBaseCharacteristic;
  public fireelementresistpercent: CharacterBaseCharacteristic;
  public neutralelementreduction: CharacterBaseCharacteristic;
  public earthelementreduction: CharacterBaseCharacteristic;
  public waterelementreduction: CharacterBaseCharacteristic;
  public airelementreduction: CharacterBaseCharacteristic;
  public fireelementreduction: CharacterBaseCharacteristic;
  public pushdamagereduction: CharacterBaseCharacteristic;
  public criticaldamagereduction: CharacterBaseCharacteristic;
  public pvpneutralelementresistpercent: CharacterBaseCharacteristic;
  public pvpearthelementresistpercent: CharacterBaseCharacteristic;
  public pvpwaterelementresistpercent: CharacterBaseCharacteristic;
  public pvpairelementresistpercent: CharacterBaseCharacteristic;
  public pvpfireelementresistpercent: CharacterBaseCharacteristic;
  public pvpneutralelementreduction: CharacterBaseCharacteristic;
  public pvpearthelementreduction: CharacterBaseCharacteristic;
  public pvpwaterelementreduction: CharacterBaseCharacteristic;
  public pvpairelementreduction: CharacterBaseCharacteristic;
  public pvpfireelementreduction: CharacterBaseCharacteristic;
  public probationtime: number;

  constructor(experience = 0, experiencelevelfloor = 0, experiencenextlevelfloor = 0,
              kamas = 0, statspoints = 0, spellspoints = 0, alignmentinfos: ActorExtendedAlignmentInformations,
              lifepoints = 0, maxlifepoints = 0, energypoints = 0, maxenergypoints = 0,
              actionpointscurrent = 0, movementpointscurrent = 0, initiative: CharacterBaseCharacteristic,
              prospecting: CharacterBaseCharacteristic, actionpoints: CharacterBaseCharacteristic,
              movementpoints: CharacterBaseCharacteristic, strength: CharacterBaseCharacteristic,
              vitality: CharacterBaseCharacteristic, wisdom: CharacterBaseCharacteristic,
              chance: CharacterBaseCharacteristic, agility: CharacterBaseCharacteristic,
              intelligence: CharacterBaseCharacteristic, range: CharacterBaseCharacteristic,
              summonablecreaturesboost: CharacterBaseCharacteristic, reflect: CharacterBaseCharacteristic,
              criticalhit: CharacterBaseCharacteristic, criticalhitweapon = 0,
              criticalmiss: CharacterBaseCharacteristic, healbonus: CharacterBaseCharacteristic,
              alldamagesbonus: CharacterBaseCharacteristic, weapondamagesbonuspercent: CharacterBaseCharacteristic,
              damagesbonuspercent: CharacterBaseCharacteristic, trapbonus: CharacterBaseCharacteristic,
              trapbonuspercent: CharacterBaseCharacteristic, glyphbonuspercent: CharacterBaseCharacteristic,
              permanentdamagepercent: CharacterBaseCharacteristic, tackleblock: CharacterBaseCharacteristic,
              tackleevade: CharacterBaseCharacteristic, paattack: CharacterBaseCharacteristic,
              pmattack: CharacterBaseCharacteristic, pushdamagebonus: CharacterBaseCharacteristic,
              criticaldamagebonus: CharacterBaseCharacteristic, neutraldamagebonus: CharacterBaseCharacteristic,
              earthdamagebonus: CharacterBaseCharacteristic, waterdamagebonus: CharacterBaseCharacteristic,
              airdamagebonus: CharacterBaseCharacteristic, firedamagebonus: CharacterBaseCharacteristic,
              dodgepalostprobability: CharacterBaseCharacteristic, dodgepmlostprobability: CharacterBaseCharacteristic,
              neutralelementresistpercent: CharacterBaseCharacteristic,
              earthelementresistpercent: CharacterBaseCharacteristic,
              waterelementresistpercent: CharacterBaseCharacteristic,
              airelementresistpercent: CharacterBaseCharacteristic,
              fireelementresistpercent: CharacterBaseCharacteristic,
              neutralelementreduction: CharacterBaseCharacteristic,
              earthelementreduction: CharacterBaseCharacteristic,
              waterelementreduction: CharacterBaseCharacteristic,
              airelementreduction: CharacterBaseCharacteristic,
              fireelementreduction: CharacterBaseCharacteristic,
              pushdamagereduction: CharacterBaseCharacteristic,
              criticaldamagereduction: CharacterBaseCharacteristic,
              pvpneutralelementresistpercent: CharacterBaseCharacteristic,
              pvpearthelementresistpercent: CharacterBaseCharacteristic,
              pvpwaterelementresistpercent: CharacterBaseCharacteristic,
              pvpairelementresistpercent: CharacterBaseCharacteristic,
              pvpfireelementresistpercent: CharacterBaseCharacteristic,
              pvpneutralelementreduction: CharacterBaseCharacteristic,
              pvpearthelementreduction: CharacterBaseCharacteristic,
              pvpwaterelementreduction: CharacterBaseCharacteristic,
              pvpairelementreduction: CharacterBaseCharacteristic,
              pvpfireelementreduction: CharacterBaseCharacteristic,
              probationtime = 0, spellmodifications: CharacterSpellModification[]) {
    this.spellmodifications = spellmodifications;
    this.experience = experience;
    this.experiencelevelfloor = experiencelevelfloor;
    this.experiencenextlevelfloor = experiencenextlevelfloor;
    this.kamas = kamas;
    this.statspoints = statspoints;
    this.spellspoints = spellspoints;
    this.alignmentinfos = alignmentinfos;
    this.alignmentinfos = alignmentinfos;
    this.lifepoints = lifepoints;
    this.maxlifepoints = maxlifepoints;
    this.energypoints = energypoints;
    this.maxenergypoints = maxenergypoints;
    this.actionpointscurrent = actionpointscurrent;
    this.movementpointscurrent = movementpointscurrent;
    this.initiative = initiative;
    this.initiative = initiative;
    this.prospecting = prospecting;
    this.prospecting = prospecting;
    this.actionpoints = actionpoints;
    this.actionpoints = actionpoints;
    this.movementpoints = movementpoints;
    this.movementpoints = movementpoints;
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
    this.summonablecreaturesboost = summonablecreaturesboost;
    this.summonablecreaturesboost = summonablecreaturesboost;
    this.reflect = reflect;
    this.reflect = reflect;
    this.criticalhit = criticalhit;
    this.criticalhit = criticalhit;
    this.criticalhitweapon = criticalhitweapon;
    this.criticalmiss = criticalmiss;
    this.criticalmiss = criticalmiss;
    this.healbonus = healbonus;
    this.healbonus = healbonus;
    this.alldamagesbonus = alldamagesbonus;
    this.alldamagesbonus = alldamagesbonus;
    this.weapondamagesbonuspercent = weapondamagesbonuspercent;
    this.weapondamagesbonuspercent = weapondamagesbonuspercent;
    this.damagesbonuspercent = damagesbonuspercent;
    this.damagesbonuspercent = damagesbonuspercent;
    this.trapbonus = trapbonus;
    this.trapbonus = trapbonus;
    this.trapbonuspercent = trapbonuspercent;
    this.trapbonuspercent = trapbonuspercent;
    this.glyphbonuspercent = glyphbonuspercent;
    this.glyphbonuspercent = glyphbonuspercent;
    this.permanentdamagepercent = permanentdamagepercent;
    this.permanentdamagepercent = permanentdamagepercent;
    this.tackleblock = tackleblock;
    this.tackleblock = tackleblock;
    this.tackleevade = tackleevade;
    this.tackleevade = tackleevade;
    this.paattack = paattack;
    this.paattack = paattack;
    this.pmattack = pmattack;
    this.pmattack = pmattack;
    this.pushdamagebonus = pushdamagebonus;
    this.pushdamagebonus = pushdamagebonus;
    this.criticaldamagebonus = criticaldamagebonus;
    this.criticaldamagebonus = criticaldamagebonus;
    this.neutraldamagebonus = neutraldamagebonus;
    this.neutraldamagebonus = neutraldamagebonus;
    this.earthdamagebonus = earthdamagebonus;
    this.earthdamagebonus = earthdamagebonus;
    this.waterdamagebonus = waterdamagebonus;
    this.waterdamagebonus = waterdamagebonus;
    this.airdamagebonus = airdamagebonus;
    this.airdamagebonus = airdamagebonus;
    this.firedamagebonus = firedamagebonus;
    this.firedamagebonus = firedamagebonus;
    this.dodgepalostprobability = dodgepalostprobability;
    this.dodgepalostprobability = dodgepalostprobability;
    this.dodgepmlostprobability = dodgepmlostprobability;
    this.dodgepmlostprobability = dodgepmlostprobability;
    this.neutralelementresistpercent = neutralelementresistpercent;
    this.neutralelementresistpercent = neutralelementresistpercent;
    this.earthelementresistpercent = earthelementresistpercent;
    this.earthelementresistpercent = earthelementresistpercent;
    this.waterelementresistpercent = waterelementresistpercent;
    this.waterelementresistpercent = waterelementresistpercent;
    this.airelementresistpercent = airelementresistpercent;
    this.airelementresistpercent = airelementresistpercent;
    this.fireelementresistpercent = fireelementresistpercent;
    this.fireelementresistpercent = fireelementresistpercent;
    this.neutralelementreduction = neutralelementreduction;
    this.neutralelementreduction = neutralelementreduction;
    this.earthelementreduction = earthelementreduction;
    this.earthelementreduction = earthelementreduction;
    this.waterelementreduction = waterelementreduction;
    this.waterelementreduction = waterelementreduction;
    this.airelementreduction = airelementreduction;
    this.airelementreduction = airelementreduction;
    this.fireelementreduction = fireelementreduction;
    this.fireelementreduction = fireelementreduction;
    this.pushdamagereduction = pushdamagereduction;
    this.pushdamagereduction = pushdamagereduction;
    this.criticaldamagereduction = criticaldamagereduction;
    this.criticaldamagereduction = criticaldamagereduction;
    this.pvpneutralelementresistpercent = pvpneutralelementresistpercent;
    this.pvpneutralelementresistpercent = pvpneutralelementresistpercent;
    this.pvpearthelementresistpercent = pvpearthelementresistpercent;
    this.pvpearthelementresistpercent = pvpearthelementresistpercent;
    this.pvpwaterelementresistpercent = pvpwaterelementresistpercent;
    this.pvpwaterelementresistpercent = pvpwaterelementresistpercent;
    this.pvpairelementresistpercent = pvpairelementresistpercent;
    this.pvpairelementresistpercent = pvpairelementresistpercent;
    this.pvpfireelementresistpercent = pvpfireelementresistpercent;
    this.pvpfireelementresistpercent = pvpfireelementresistpercent;
    this.pvpneutralelementreduction = pvpneutralelementreduction;
    this.pvpneutralelementreduction = pvpneutralelementreduction;
    this.pvpearthelementreduction = pvpearthelementreduction;
    this.pvpearthelementreduction = pvpearthelementreduction;
    this.pvpwaterelementreduction = pvpwaterelementreduction;
    this.pvpwaterelementreduction = pvpwaterelementreduction;
    this.pvpairelementreduction = pvpairelementreduction;
    this.pvpairelementreduction = pvpairelementreduction;
    this.pvpfireelementreduction = pvpfireelementreduction;
    this.pvpfireelementreduction = pvpfireelementreduction;
    this.probationtime = probationtime;
  }
}
