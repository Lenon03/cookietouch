import Message from "@/protocol/network/messages/Message";
import ObjectItemToSellInHumanVendorShop from "@/protocol/network/types/ObjectItemToSellInHumanVendorShop";

export default class ExchangeStartOkHumanVendorMessage extends Message {
  public objectsInfos: ObjectItemToSellInHumanVendorShop[];
  public sellerId: number;

  constructor(sellerId = 0, objectsInfos: ObjectItemToSellInHumanVendorShop[]) {
    super();
    this.objectsInfos = objectsInfos;
    this.sellerId = sellerId;

  }
}
