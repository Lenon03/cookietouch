import Cell from "./Cell";

export default class Map {
  public id: number;
  public topNeighbourId: number;
  public bottomNeightbourId: number;
  public leftNeighbourId: number;
  public rightNeighbourId: number;
  public cells: Cell[];
}
