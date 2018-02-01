import ObjectItemToSellInHumanVendorShop from "@protocol/network/types/ObjectItemToSellInHumanVendorShop";
import Message from "./Message";

export default class ExchangeStartOkHumanVendorMessage extends Message {
  public objectsInfos: ObjectItemToSellInHumanVendorShop[];
  public sellerId: number;

  constructor(sellerId = 0, objectsInfos: ObjectItemToSellInHumanVendorShop[]) {
    super();
    this.objectsInfos = objectsInfos;
    this.sellerId = sellerId;

  }
}
