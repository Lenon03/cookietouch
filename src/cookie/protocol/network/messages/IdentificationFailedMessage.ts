import Message from "@/protocol/network/messages/Message";

export default class IdentificationFailedMessage extends Message {
  public reason: number;

  constructor(reason = 99) {
    super();
    this.reason = reason;

  }
}
