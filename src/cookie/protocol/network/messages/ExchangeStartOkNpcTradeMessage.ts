import Message from "@/protocol/network/messages/Message";

export default class ExchangeStartOkNpcTradeMessage extends Message {
  public npcId: number;

  constructor(npcId = 0) {
    super();
    this.npcId = npcId;

  }
}
