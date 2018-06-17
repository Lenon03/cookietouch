import Type from "./Type";

export default class GameActionMarkedCell extends Type {
  public cellId: number;
  public zoneSize: number;
  public cellColor: number;
  public cellsType: number;

  constructor(cellId = 0, zoneSize = 0, cellColor = 0, cellsType = 0) {
    super();
    this.cellId = cellId;
    this.zoneSize = zoneSize;
    this.cellColor = cellColor;
    this.cellsType = cellsType;
  }
}
