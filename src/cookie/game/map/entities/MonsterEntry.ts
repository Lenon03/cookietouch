import DataManager from "../../../protocol/data";
import DataClasses from "../../../protocol/data/classes";
import MonsterInGroupLightInformations from "../../../protocol/network/types/MonsterInGroupLightInformations";

export default class MonsterEntry {
  public genericId: number;
  public grade: number;
  public name: string;
  public level: number;
  public boss: boolean;
  public miniBoss: boolean;
  public questMonster: boolean;

  constructor(infos: MonsterInGroupLightInformations) {
    this.genericId = infos.creatureGenericId;
    this.grade = infos.grade;
    DataManager.get(DataClasses.Monsters, this.genericId).then((data) => {
      const m = data[0].object;
      this.name = m.nameId;
      this.level = m.grades[this.grade - 1].level;
      this.boss = m.isBoss;
      this.miniBoss = m.isMiniBoss;
      this.questMonster = m.isQuestMonster;
    });
  }
}
