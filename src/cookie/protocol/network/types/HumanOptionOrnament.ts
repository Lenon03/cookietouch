import HumanOption from "./HumanOption";

export default class HumanOptionOrnament extends HumanOption {
  public ornamentId: number;

  constructor(ornamentId = 0) {
    super();
    this.ornamentId = ornamentId;

  }
}
