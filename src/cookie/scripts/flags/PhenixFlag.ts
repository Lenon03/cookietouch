import { IFlag } from "./IFlag";

export default class PhenixFlag implements IFlag {
  public cellId: number;

  constructor(cellId: number) {
    this.cellId = cellId;
  }
}
