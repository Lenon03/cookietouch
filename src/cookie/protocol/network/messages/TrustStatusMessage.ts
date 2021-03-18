import Message from "@/protocol/network/messages/Message";

export default class TrustStatusMessage extends Message {
  public trusted: boolean;

  constructor(trusted = false) {
    super();
    this.trusted = trusted;

  }
}
