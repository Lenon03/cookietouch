import Message from "@/protocol/network/messages/Message";

export default class ClientKeyMessage extends Message {
  public key: string;

  constructor(key = "") {
    super();
    this.key = key;

  }
}
