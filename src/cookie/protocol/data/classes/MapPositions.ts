import Data from "@/protocol/data/Data";

export default class MapPositions extends Data {
  public _type: string;
  public posX: number;
  public posY: number;
  public outdoor: boolean;
  public capabilities: number;
  public sounds: any[];
  public subAreaId: number;
  public worldMap: number;
  public hasPriorityOnWorldmap: boolean;
}
