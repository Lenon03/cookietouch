import ObjectItemToSell from "@/protocol/network/types/ObjectItemToSell";
import Message from "@/protocol/network/messages/Message";

export default class ExchangeShopStockMovementUpdatedMessage extends Message {
  public objectInfo: ObjectItemToSell;

  constructor(objectInfo: ObjectItemToSell) {
    super();
    this.objectInfo = objectInfo;

  }
}
