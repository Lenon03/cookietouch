import Message from "@/protocol/network/messages/Message";

export default class HelloConnectMessage extends Message {

  public key: number[];
  public salt: string;

  constructor(salt = "", key: number[]) {
    super();
    this.key = key;
    this.salt = salt;
  }
}
