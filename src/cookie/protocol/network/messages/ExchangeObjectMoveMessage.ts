import Message from "./Message";

export default class ExchangeObjectMoveMessage extends Message {
  public objectUID: number;
  public quantity: number;
  public price: number;

  constructor(objectUID = 0, quantity = 0) {
    super();
    this.objectUID = objectUID;
    this.quantity = quantity;

  }
}
