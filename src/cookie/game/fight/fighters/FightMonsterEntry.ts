import FighterEntry from "@/game/fight/fighters/FighterEntry";
import DataManager from "@/protocol/data";
import Monsters from "@/protocol/data/classes/Monsters";
import { DataTypes } from "@/protocol/data/DataTypes";
import GameFightFighterInformations from "@/protocol/network/types/GameFightFighterInformations";
import GameFightMonsterInformations from "@/protocol/network/types/GameFightMonsterInformations";

export default class FightMonsterEntry extends FighterEntry {
  public creatureGenericId: number = 0;
  public level: number = 0;
  public isBoss: boolean = false;
  public isMiniBoss: boolean = false;
  public isQuestMonster: boolean = false;

  public static async setup(
    infos1: GameFightMonsterInformations,
    infos2: GameFightFighterInformations
  ): Promise<FightMonsterEntry> {
    const f = new FightMonsterEntry(infos2);

    f.creatureGenericId = infos1.creatureGenericId;

    const data = await DataManager.get<Monsters>(
      DataTypes.Monsters,
      f.creatureGenericId
    );

    const m = data[0].object;
    f.name = m.nameId;
    f.isBoss = m.isBoss;
    f.isMiniBoss = m.isMiniBoss;
    f.isQuestMonster = m.isQuestMonster;
    f.level = m.grades[infos1.creatureGrade - 1].level;

    return f;
  }
}
