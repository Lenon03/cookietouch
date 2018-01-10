import { IFlag, IFlagType } from "./IFlag";

export default class CustomFlag implements IFlag {
  public type = IFlagType.CustomFlag;
  public func: () => void;

  constructor(func: () => void) {
    this.func = func;
  }
}
