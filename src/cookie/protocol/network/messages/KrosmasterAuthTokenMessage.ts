import Message from "@/protocol/network/messages/Message";

export default class KrosmasterAuthTokenMessage extends Message {
  public token: string;

  constructor(token = "") {
    super();
    this.token = token;

  }
}
