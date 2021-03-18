import Message from "@/protocol/network/messages/Message";

export default class MountXpRatioMessage extends Message {
  public ratio: number;

  constructor(ratio = 0) {
    super();
    this.ratio = ratio;

  }
}
