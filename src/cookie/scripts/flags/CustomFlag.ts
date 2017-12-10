import { IFlag } from "./IFlag";

export default class CustomFlag implements IFlag {
  public func: string;

  constructor(func: string) {
    this.func = func;
  }
}
