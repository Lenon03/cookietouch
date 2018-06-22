import ObjectItemToSell from "@/protocol/network/types/ObjectItemToSell";
import Message from "@/protocol/network/messages/Message";

export default class ExchangeShopStockStartedMessage extends Message {
  public objectsInfos: ObjectItemToSell[];

  constructor(objectsInfos: ObjectItemToSell[]) {
    super();
    this.objectsInfos = objectsInfos;

  }
}
