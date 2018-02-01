import Data from "../Data";

export default class QuestObjectives extends Data {
  public _type: string;
  public stepId: number;
  public typeId: number;
  public mapId: number;
  public dialogId: number;
  public parameters: number[];
  public coords: any;
}
