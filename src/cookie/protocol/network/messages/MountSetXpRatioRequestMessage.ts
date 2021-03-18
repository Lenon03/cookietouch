import Message from "@/protocol/network/messages/Message";

export default class MountSetXpRatioRequestMessage extends Message {
  public xpRatio: number;

  constructor(xpRatio = 0) {
    super();
    this.xpRatio = xpRatio;

  }
}
