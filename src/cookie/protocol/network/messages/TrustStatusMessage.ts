import Message from "./Message";

export default class TrustStatusMessage extends Message {
  public trusted: boolean;

  constructor(trusted = false) {
    super();
    this.trusted = trusted;

  }
}
