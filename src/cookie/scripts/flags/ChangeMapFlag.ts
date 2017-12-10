import { IFlag } from "./IFlag";

export default class ChangeMapFlag implements IFlag {
  public where: string;

  constructor(where: string) {
    this.where = where;
  }
}
