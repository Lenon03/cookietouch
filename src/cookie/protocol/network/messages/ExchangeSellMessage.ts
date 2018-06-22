import Message from "@/protocol/network/messages/Message";

export default class ExchangeSellMessage extends Message {
  public objectToSellId: number;
  public quantity: number;

  constructor(objectToSellId = 0, quantity = 0) {
    super();
    this.objectToSellId = objectToSellId;
    this.quantity = quantity;

  }
}
