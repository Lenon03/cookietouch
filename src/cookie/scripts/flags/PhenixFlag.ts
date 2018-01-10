import { IFlag, IFlagType } from "./IFlag";

export default class PhenixFlag implements IFlag {
  public type = IFlagType.PhenixFlag;
  public cellId: number;

  constructor(cellId: number) {
    this.cellId = cellId;
  }
}
