import Type from "./Type";

export default class FightEntityDispositionInformations extends Type {

  public carryingcharacterid: number;

  constructor(cellid = 0, direction = 1, carryingcharacterid = 0) {
    super();
    this.carryingcharacterid = carryingcharacterid;
  }
}
