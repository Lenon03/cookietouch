import Message from "./Message";

export default class ClientKeyMessage extends Message {
  public key: string;

  constructor(key = "") {
    super();
    this.key = key;

  }
}
