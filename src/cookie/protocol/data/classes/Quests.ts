import Data from "../Data";

export default class Quests extends Data {
  public nameId: string;
  public categoryId: number;
  public isRepeatable: boolean;
  public repeatType: number;
  public repeatLimit: number;
  public isDungeonQuest: boolean;
  public levelMin: number;
  public levelMax: number;
  public stepIds: number[];
}
