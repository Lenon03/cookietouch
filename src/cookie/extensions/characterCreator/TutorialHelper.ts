import { SpellResistances } from "@/extensions/fights/configuration/enums/SpellResistances";
import { SpellTargets } from "@/extensions/fights/configuration/enums/SpellTargets";
import Spell from "@/extensions/fights/configuration/Spell";
import { BreedEnum } from "@/protocol/enums/BreedEnum";
import { List } from "linqts";

export default class TutorialHelper {
  public static questTutorialId = 489;
  public static mapIdFirst = 81002496;
  public static mapIdSecondAfterFight = 81003522;
  public static mapIdThirdBeforeFight = 81004544;
  public static mapIdThirdAfterFight = 81004546;
  public static firstEquipItem = 10785;
  public static secondEquipItems = [10784, 10794, 10797, 10799, 10800];

  public static baseSpells = new Map<BreedEnum, List<Spell>>([
    [
      BreedEnum.Feca,
      new List<Spell>([
        new Spell(
          3,
          "Attaque Naturelle",
          SpellTargets.ENEMY,
          1,
          2,
          100,
          100,
          SpellResistances.EARTH,
          100,
          0,
          true,
          false,
          false,
          false
        )
      ])
    ],
    [
      BreedEnum.Osamodas,
      new List<Spell>([
        new Spell(
          21,
          "Griffe Spectrale",
          SpellTargets.ENEMY,
          1,
          2,
          100,
          100,
          SpellResistances.EARTH,
          100,
          0,
          true,
          false,
          false,
          false
        )
      ])
    ],
    [
      BreedEnum.Enutrof,
      new List<Spell>([
        new Spell(
          43,
          "Lancer de Pelle",
          SpellTargets.ENEMY,
          1,
          2,
          100,
          100,
          SpellResistances.EARTH,
          100,
          0,
          true,
          false,
          false,
          false
        )
      ])
    ],
    [
      BreedEnum.Sram,
      new List<Spell>([
        new Spell(
          61,
          "Sournoiserie",
          SpellTargets.ENEMY,
          1,
          2,
          100,
          100,
          SpellResistances.EARTH,
          100,
          0,
          true,
          false,
          false,
          false
        )
      ])
    ],
    [
      BreedEnum.Xelor,
      new List<Spell>([
        new Spell(
          83,
          "Aiguille",
          SpellTargets.ENEMY,
          1,
          2,
          100,
          100,
          SpellResistances.EARTH,
          100,
          0,
          true,
          false,
          false,
          false
        )
      ])
    ],
    [
      BreedEnum.Ecaflip,
      new List<Spell>([
        new Spell(
          102,
          "Pile ou Face",
          SpellTargets.ENEMY,
          1,
          2,
          100,
          100,
          SpellResistances.EARTH,
          100,
          0,
          true,
          false,
          false,
          false
        )
      ])
    ],
    [
      BreedEnum.Eniripsa,
      new List<Spell>([
        new Spell(
          125,
          "Mot Interdit",
          SpellTargets.ENEMY,
          1,
          2,
          100,
          100,
          SpellResistances.EARTH,
          100,
          0,
          true,
          false,
          false,
          false
        )
      ])
    ],
    [
      BreedEnum.Iop,
      new List<Spell>([
        new Spell(
          141,
          "Pression",
          SpellTargets.ENEMY,
          1,
          2,
          100,
          100,
          SpellResistances.EARTH,
          100,
          0,
          true,
          false,
          false,
          false
        )
      ])
    ],
    [
      BreedEnum.Cra,
      new List<Spell>([
        new Spell(
          161,
          "Flèche Magique",
          SpellTargets.ENEMY,
          1,
          2,
          100,
          100,
          SpellResistances.EARTH,
          100,
          0,
          true,
          false,
          false,
          false
        )
      ])
    ],
    [
      BreedEnum.Sadida,
      new List<Spell>([
        new Spell(
          183,
          "Ronce",
          SpellTargets.ENEMY,
          1,
          2,
          100,
          100,
          SpellResistances.EARTH,
          100,
          0,
          true,
          false,
          false,
          false
        )
      ])
    ],
    [
      BreedEnum.Sacrieur,
      new List<Spell>([
        new Spell(
          432,
          "Pied du Sacrieur",
          SpellTargets.ENEMY,
          1,
          2,
          100,
          100,
          SpellResistances.EARTH,
          100,
          0,
          true,
          false,
          false,
          false
        )
      ])
    ],
    [
      BreedEnum.Pandawa,
      new List<Spell>([
        new Spell(
          686,
          "Picole",
          SpellTargets.SELF,
          5,
          2,
          100,
          100,
          SpellResistances.EARTH,
          100,
          0,
          true,
          false,
          false,
          false
        ),
        new Spell(
          692,
          "Gueule de Bois",
          SpellTargets.ENEMY,
          1,
          2,
          100,
          100,
          SpellResistances.EARTH,
          100,
          0,
          true,
          false,
          false,
          false
        )
      ])
    ],
    [
      BreedEnum.Roublard,
      new List<Spell>([
        new Spell(
          2808,
          "Explobombe",
          SpellTargets.ENEMY,
          1,
          2,
          100,
          100,
          SpellResistances.EARTH,
          100,
          0,
          true,
          false,
          false,
          false
        )
      ])
    ],
    [
      BreedEnum.Zobal,
      new List<Spell>([
        new Spell(
          2881,
          "Martelo",
          SpellTargets.ENEMY,
          1,
          2,
          100,
          100,
          SpellResistances.EARTH,
          100,
          0,
          true,
          false,
          false,
          false
        )
      ])
    ],
    [
      BreedEnum.Steamer,
      new List<Spell>([
        new Spell(
          3210,
          "Ancrage",
          SpellTargets.ENEMY,
          1,
          2,
          100,
          100,
          SpellResistances.EARTH,
          100,
          0,
          true,
          false,
          false,
          false
        )
      ])
    ]
  ]);
}
