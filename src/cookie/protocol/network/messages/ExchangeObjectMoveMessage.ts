import Message from "@/protocol/network/messages/Message";

export default class ExchangeObjectMoveMessage extends Message {
  public objectUID: number;
  public quantity: number;
  public price: number;

  constructor(objectUID = 0, quantity = 0, price = 0) {
    super();
    this.objectUID = objectUID;
    this.quantity = quantity;
    this.price = price;
  }
}
