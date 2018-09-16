import DataManager from "@/protocol/data";
import Monsters from "@/protocol/data/classes/Monsters";
import { DataTypes } from "@/protocol/data/DataTypes";
import DTConstants from "@/protocol/DTConstants";
import MonsterInGroupLightInformations from "@/protocol/network/types/MonsterInGroupLightInformations";

export default class MonsterEntry {
  public genericId: number;
  public grade: number;
  public name: string;
  public level: number;
  public boss: boolean;
  public miniBoss: boolean;
  public questMonster: boolean;

  public static async setup(
    infos: MonsterInGroupLightInformations
  ): Promise<MonsterEntry> {
    const monsterEntry = new MonsterEntry();
    monsterEntry.genericId = infos.creatureGenericId;
    monsterEntry.grade = infos.grade;
    const data = await DataManager.get<Monsters>(
      DataTypes.Monsters,
      monsterEntry.genericId
    );
    const m = data[0].object;
    monsterEntry.name = m.nameId;
    monsterEntry.level = m.grades[monsterEntry.grade - 1].level;
    monsterEntry.boss = m.isBoss;
    monsterEntry.miniBoss = m.isMiniBoss;
    monsterEntry.questMonster = m.isQuestMonster;

    return monsterEntry;
  }
  get iconUrl() {
    return `${DTConstants.config.assetsUrl}/gfx/monsters/${this.genericId}.png`;
  }
}
