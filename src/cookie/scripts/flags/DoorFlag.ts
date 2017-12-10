import { IFlag } from "./IFlag";

export default class DoorFlag implements IFlag {
  public cellId: number;

  constructor(cellId: number) {
    this.cellId = cellId;
  }
}
