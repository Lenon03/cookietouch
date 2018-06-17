import Message from "./Message";

export default class ExchangeShopStockMovementRemovedMessage extends Message {
  public objectId: number;

  constructor(objectId = 0) {
    super();
    this.objectId = objectId;

  }
}
