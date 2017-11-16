export default class AlignmentBonusInformations {

  public pctbonus: number;
  public grademult: number;

  constructor(pctbonus = 0, grademult = 0) {
    this.pctbonus = pctbonus;
    this.grademult = grademult;
  }
}
