import Message from "@/protocol/network/messages/Message";

export default class ConnectionFailedMessage extends Message {
  public reason: string;

  constructor(reason: string) {
    super();
    this.reason = reason;
  }
}
