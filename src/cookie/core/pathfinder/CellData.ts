import CellPath from "@/core/pathfinder/CellPath";

export default class CellData {
  public i: number;
  public j: number;
  public floor: number = -1;
  public zone: number = -1;
  public speed: number = 1;
  public weight: number = 0;
  public candidateRef: CellPath | null = null;

  constructor(i: number, j: number) {
    this.i = i;
    this.j = j;
  }
}
