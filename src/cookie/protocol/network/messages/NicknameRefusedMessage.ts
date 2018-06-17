import Message from "./Message";

export default class NicknameRefusedMessage extends Message {
  public reason: number;

  constructor(reason = 99) {
    super();
    this.reason = reason;

  }
}
