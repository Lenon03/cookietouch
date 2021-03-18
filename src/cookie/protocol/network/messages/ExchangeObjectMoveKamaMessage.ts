import Message from "@/protocol/network/messages/Message";

export default class ExchangeObjectMoveKamaMessage extends Message {
  public quantity: number;

  constructor(quantity = 0) {
    super();
    this.quantity = quantity;

  }
}
