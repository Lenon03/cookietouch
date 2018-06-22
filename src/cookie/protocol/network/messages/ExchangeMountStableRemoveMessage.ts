import Message from "@/protocol/network/messages/Message";

export default class ExchangeMountStableRemoveMessage extends Message {
  public mountId: number;

  constructor(mountId = 0) {
    super();
    this.mountId = mountId;

  }
}
