import { IFlag, IFlagType } from "@/scripts/flags/IFlag";

export default class DoorFlag implements IFlag {
  public type = IFlagType.DoorFlag;
  public cellId: number;

  constructor(cellId: number) {
    this.cellId = cellId;
  }
}
