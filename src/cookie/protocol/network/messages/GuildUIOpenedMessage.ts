import Message from "@/protocol/network/messages/Message";

export default class GuildUIOpenedMessage extends Message {
  public type: number;

  constructor(type = 0) {
    super();
    this.type = type;

  }
}
