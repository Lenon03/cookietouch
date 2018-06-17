import Message from "./Message";

export default class MountXpRatioMessage extends Message {
  public ratio: number;

  constructor(ratio = 0) {
    super();
    this.ratio = ratio;

  }
}
