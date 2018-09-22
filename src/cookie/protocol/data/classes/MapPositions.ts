import Data from "@/protocol/data/Data";

export default class MapPositions extends Data {
  public _type: string = "";
  public posX: number = 0;
  public posY: number = 0;
  public outdoor: boolean = false;
  public capabilities: number = 0;
  public sounds: any[] = [];
  public subAreaId: number = 0;
  public worldMap: number = 0;
  public hasPriorityOnWorldmap: boolean = false;
}
