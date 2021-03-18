import Message from "@/protocol/network/messages/Message";

export default class BasicPingMessage extends Message {
  public quiet: boolean;

  constructor(quiet = false) {
    super();
    this.quiet = quiet;

  }
}
