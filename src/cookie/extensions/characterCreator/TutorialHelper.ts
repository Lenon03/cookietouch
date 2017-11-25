import { SpellResistances } from "@/extensions/fights/configuration/enums/SpellResistances";
import { SpellTargets } from "@/extensions/fights/configuration/enums/SpellTargets";
import Spell from "@/extensions/fights/configuration/Spell";
import { BreedEnum } from "@protocol/enums/BreedEnum";
import Dictionary from "@utils/Dictionary";
import { List } from "linqts";

export default class TutorialHelper {
  public static questTutorialId = 489;
  public static mapIdFirst = 81002496;
  // public static mapIdSecondBeforeFight = 81003520;
  public static mapIdSecondAfterFight = 81003522;
  public static mapIdThirdBeforeFight = 81004544;
  public static mapIdThirdAfterFight = 81004546;
  public static firstEquipItem = 10785;
  public static secondEquipItems = [10784, 10794, 10797, 10798, 10799, 10800];

  public static baseSpells = new Dictionary<BreedEnum, List<Spell>>([
    { key: BreedEnum.Feca, value: new List<Spell>([
      new Spell(3, "", SpellTargets.ENEMY, 1, 2, 100, 100, SpellResistances.EARTH, 100, 0, true, false, false, false),
    ])},
    { key: BreedEnum.Osamodas, value: new List<Spell>([
      new Spell(21, "", SpellTargets.ENEMY, 1, 2, 100, 100, SpellResistances.EARTH, 100, 0, true, false, false, false),
    ])},
    { key: BreedEnum.Enutrof, value: new List<Spell>([
      new Spell(43, "", SpellTargets.ENEMY, 1, 2, 100, 100, SpellResistances.EARTH, 100, 0, true, false, false, false),
    ])},
    { key: BreedEnum.Sram, value: new List<Spell>([
      new Spell(61, "", SpellTargets.ENEMY, 1, 2, 100, 100, SpellResistances.EARTH, 100, 0, true, false, false, false),
    ])},
    { key: BreedEnum.Xelor, value: new List<Spell>([
      new Spell(83, "", SpellTargets.ENEMY, 1, 2, 100, 100, SpellResistances.EARTH, 100, 0, true, false, false, false),
    ])},
    { key: BreedEnum.Ecaflip, value: new List<Spell>([
      new Spell(102, "", SpellTargets.ENEMY, 1, 2, 100, 100, SpellResistances.EARTH, 100, 0, true, false, false, false),
    ])},
    { key: BreedEnum.Eniripsa, value: new List<Spell>([
      new Spell(125, "", SpellTargets.ENEMY, 1, 2, 100, 100, SpellResistances.EARTH, 100, 0, true, false, false, false),
    ])},
    { key: BreedEnum.Iop, value: new List<Spell>([
      new Spell(141, "", SpellTargets.ENEMY, 1, 2, 100, 100, SpellResistances.EARTH, 100, 0, true, false, false, false),
    ])},
    { key: BreedEnum.Cra, value: new List<Spell>([
      new Spell(161, "", SpellTargets.ENEMY, 1, 2, 100, 100, SpellResistances.EARTH, 100, 0, true, false, false, false),
    ])},
    { key: BreedEnum.Sadida, value: new List<Spell>([
      new Spell(183, "", SpellTargets.ENEMY, 1, 2, 100, 100, SpellResistances.EARTH, 100, 0, true, false, false, false),
    ])},
    { key: BreedEnum.Sacrieur, value: new List<Spell>([
      new Spell(432, "", SpellTargets.ENEMY, 1, 2, 100, 100, SpellResistances.EARTH, 100, 0, true, false, false, false),
    ])},
    { key: BreedEnum.Pandawa, value: new List<Spell>([
      new Spell(686, "", SpellTargets.SELF, 5, 2, 100, 100, SpellResistances.EARTH, 100, 0, true, false, false, false),
      new Spell(692, "", SpellTargets.ENEMY, 1, 2, 100, 100, SpellResistances.EARTH, 100, 0, true, false, false, false),
    ])},
    { key: BreedEnum.Roublard, value: new List<Spell>([
      new Spell(2808, "", SpellTargets.ENEMY, 1, 2, 100, 100, SpellResistances.EARTH, 100, 0, true, false, false, false),
    ])},
    { key: BreedEnum.Zobal, value: new List<Spell>([
      new Spell(2881, "", SpellTargets.ENEMY, 1, 2, 100, 100, SpellResistances.EARTH, 100, 0, true, false, false, false),
    ])},
    { key: BreedEnum.Steamer, value: new List<Spell>([
      new Spell(3210, "", SpellTargets.ENEMY, 1, 2, 100, 100, SpellResistances.EARTH, 100, 0, true, false, false, false),
    ])},
  ]);
}
