import Data from "@/protocol/data/Data";

export default class Quests extends Data {
  public nameId: string = "";
  public categoryId: number = 0;
  public isRepeatable: boolean = false;
  public repeatType: number = 0;
  public repeatLimit: number = 0;
  public isDungeonQuest: boolean = false;
  public levelMin: number = 0;
  public levelMax: number = 0;
  public stepIds: number[] = [];
}
