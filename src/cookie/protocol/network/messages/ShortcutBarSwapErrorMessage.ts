import Message from "@/protocol/network/messages/Message";

export default class ShortcutBarSwapErrorMessage extends Message {
  public error: number;

  constructor(error = 0) {
    super();
    this.error = error;

  }
}
