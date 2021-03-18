import Message from "@/protocol/network/messages/Message";

export default class GameContextCreateMessage extends Message {
  public context: number;

  constructor(context = 1) {
    super();
    this.context = context;

  }
}
