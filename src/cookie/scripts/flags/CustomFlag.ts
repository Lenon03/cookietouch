import { IFlag, IFlagType } from "./IFlag";

export default class CustomFlag implements IFlag {
  public type = IFlagType.CustomFlag;
  public func: GeneratorFunction;

  constructor(func: GeneratorFunction) {
    this.func = func;
  }
}
