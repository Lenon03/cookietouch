import Message from "@/protocol/network/messages/Message";

export default class PrismsListRegisterMessage extends Message {
  public listen: number;

  constructor(listen = 0) {
    super();
    this.listen = listen;

  }
}
