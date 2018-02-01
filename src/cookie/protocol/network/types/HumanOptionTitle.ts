import HumanOption from "./HumanOption";

export default class HumanOptionTitle extends HumanOption {
  public titleId: number;
  public titleParam: string;

  constructor(titleId = 0, titleParam = "") {
    super();
    this.titleId = titleId;
    this.titleParam = titleParam;
  }
}
