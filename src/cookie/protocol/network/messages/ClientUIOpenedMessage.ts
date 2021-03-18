import Message from "@/protocol/network/messages/Message";

export default class ClientUIOpenedMessage extends Message {
  public type: number;

  constructor(type = 0) {
    super();
    this.type = type;

  }
}
