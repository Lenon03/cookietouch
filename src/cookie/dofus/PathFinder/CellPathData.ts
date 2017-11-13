import { CellPath } from "./CellPath";

export class CellPathData {

  public i: number;
  public j: number;
  public floor: number = -1;
  public zone: number = -1;
  public speed: number = 1;
  public weight: number = 0;
  public candidateRef: CellPath = null;
  public f: number = 0;

  constructor(i: number, j: number) {
    this.i = i;
    this.j = j;
  }
}
