import Message from "@/protocol/network/messages/Message";
import ObjectItemToSell from "@/protocol/network/types/ObjectItemToSell";

export default class ExchangeShopStockMovementUpdatedMessage extends Message {
  public objectInfo: ObjectItemToSell;

  constructor(objectInfo: ObjectItemToSell) {
    super();
    this.objectInfo = objectInfo;

  }
}
