import Type from "./Type";

export default class Shortcut extends Type {
  public slot: number;

  constructor(slot = 0) {
    super();
    this.slot = slot;
  }
}
