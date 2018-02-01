import ObjectItemToSell from "@protocol/network/types/ObjectItemToSell";
import Message from "./Message";

export default class ExchangeShopStockMultiMovementUpdatedMessage extends Message {
  public objectInfoList: ObjectItemToSell[];

  constructor(objectInfoList: ObjectItemToSell[]) {
    super();
    this.objectInfoList = objectInfoList;

  }
}
