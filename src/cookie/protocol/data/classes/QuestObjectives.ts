import Data from "@/protocol/data/Data";

export default class QuestObjectives extends Data {
  public _type: string = "";
  public stepId: number = 0;
  public typeId: number = 0;
  public mapId: number = 0;
  public dialogId: number = 0;
  public parameters: number[] = [];
  public coords: any;
}
