import Cell from "./Cell";

export default class Map {
  public id: number;
  public topNeighbourId: number;
  public bottomNeighbourId: number;
  public leftNeighbourId: number;
  public rightNeighbourId: number;
  public cells: Cell[] = [];

  constructor(id: number, topNeighbourId: number, bottomNeighbourId: number,
              leftNeighbourId: number, rightNeighbourId: number) {
    this.id = id;
    this.topNeighbourId = topNeighbourId;
    this.bottomNeighbourId = bottomNeighbourId;
    this.leftNeighbourId = leftNeighbourId;
    this.rightNeighbourId = rightNeighbourId;
  }
}
