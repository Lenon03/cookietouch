import Data from "@/protocol/data/Data";

export default class QuestObjectives extends Data {
  public _type: string;
  public stepId: number;
  public typeId: number;
  public mapId: number;
  public dialogId: number;
  public parameters: number[];
  public coords: any;
}
