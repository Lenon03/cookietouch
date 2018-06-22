import Type from "@/protocol/network/types/Type";

export default class AlignmentBonusInformations extends Type {

  public pctbonus: number;
  public grademult: number;

  constructor(pctbonus = 0, grademult = 0) {
    super();
    this.pctbonus = pctbonus;
    this.grademult = grademult;
  }
}
