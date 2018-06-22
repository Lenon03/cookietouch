import Message from "@/protocol/network/messages/Message";
import ObjectItemToSell from "@/protocol/network/types/ObjectItemToSell";

export default class ExchangeShopStockStartedMessage extends Message {
  public objectsInfos: ObjectItemToSell[];

  constructor(objectsInfos: ObjectItemToSell[]) {
    super();
    this.objectsInfos = objectsInfos;

  }
}
