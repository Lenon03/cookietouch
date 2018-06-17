import Message from "./Message";

export default class ChatErrorMessage extends Message {
  public reason: string;

  constructor(reason = "") {
    super();
    this.reason = reason;

  }
}
