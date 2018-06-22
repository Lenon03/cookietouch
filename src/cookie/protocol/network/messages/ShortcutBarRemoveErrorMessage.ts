import Message from "@/protocol/network/messages/Message";

export default class ShortcutBarRemoveErrorMessage extends Message {
  public error: number;

  constructor(error = 0) {
    super();
    this.error = error;

  }
}
