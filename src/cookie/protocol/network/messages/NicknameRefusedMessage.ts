import Message from "@/protocol/network/messages/Message";

export default class NicknameRefusedMessage extends Message {
  public reason: number;

  constructor(reason = 99) {
    super();
    this.reason = reason;

  }
}
