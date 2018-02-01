import Message from "./Message";

export default class ExchangeShopStockMultiMovementRemovedMessage extends Message {
  public objectIdList: number[];

  constructor(objectIdList: number[]) {
    super();
    this.objectIdList = objectIdList;

  }
}
