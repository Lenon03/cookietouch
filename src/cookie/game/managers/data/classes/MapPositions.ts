import Data from "../Data";

export default class MapPositions extends Data {
  public posX: number;
  public posY: number;
  public outdoor: boolean;
  public capabilities: number;
  public sounds: object[];
  public subAreaId: number;
  public worldMap: number;
  public hasPriorityOnWorldmap: boolean;
}
