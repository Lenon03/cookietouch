import { DataTypes } from "@/protocol/data/DataTypes";
import DataManager from "@/protocol/data";
import Monsters from "@/protocol/data/classes/Monsters";
import GameFightFighterInformations from "@/protocol/network/types/GameFightFighterInformations";
import GameFightMonsterInformations from "@/protocol/network/types/GameFightMonsterInformations";
import FighterEntry from "@/game/fight/fighters/FighterEntry";

export default class FightMonsterEntry extends FighterEntry {
  public name: string;
  public creatureGenericId: number;
  public level: number;
  public isBoss: boolean;
  public isMiniBoss: boolean;
  public isQuestMonster: boolean;

  constructor(
    infos1: GameFightMonsterInformations,
    infos2: GameFightFighterInformations
  ) {
    super(infos2);

    this.creatureGenericId = infos1.creatureGenericId;

    DataManager.get<Monsters>(DataTypes.Monsters, this.creatureGenericId).then(
      resp => {
        const m = resp[0].object;
        this.name = m.nameId;
        this.isBoss = m.isBoss;
        this.isMiniBoss = m.isMiniBoss;
        this.isQuestMonster = m.isQuestMonster;
        this.level = m.grades[infos1.creatureGrade - 1].level;
      }
    );
  }
}
