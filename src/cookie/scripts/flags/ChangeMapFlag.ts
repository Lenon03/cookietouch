import { IFlag, IFlagType } from "@/scripts/flags/IFlag";

export default class ChangeMapFlag implements IFlag {
  public type = IFlagType.ChangeMapFlag;

  public where: string;

  constructor(where: string) {
    this.where = where;
  }
}
