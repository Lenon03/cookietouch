import Message from "@/protocol/network/messages/Message";
import ObjectItemToSell from "@/protocol/network/types/ObjectItemToSell";

export default class ExchangeShopStockMultiMovementUpdatedMessage extends Message {
  public objectInfoList: ObjectItemToSell[];

  constructor(objectInfoList: ObjectItemToSell[]) {
    super();
    this.objectInfoList = objectInfoList;

  }
}
