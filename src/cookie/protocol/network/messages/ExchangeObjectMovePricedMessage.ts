import ExchangeObjectMoveMessage from "./ExchangeObjectMoveMessage";

export default class ExchangeObjectMovePricedMessage extends ExchangeObjectMoveMessage {
  public price: number;

  constructor(objectUID = 0, quantity = 0, price = 0) {
    super(objectUID, quantity);
    this.price = price;

  }
}
