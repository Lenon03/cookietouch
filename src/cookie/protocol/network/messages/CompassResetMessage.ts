import Message from "@/protocol/network/messages/Message";

export default class CompassResetMessage extends Message {
  public type: number;

  constructor(type = 0) {
    super();
    this.type = type;

  }
}
