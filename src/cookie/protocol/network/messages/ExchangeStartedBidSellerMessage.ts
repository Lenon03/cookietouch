import ObjectItemToSellInBid from "@protocol/network/types/ObjectItemToSellInBid";
import SellerBuyerDescriptor from "@protocol/network/types/SellerBuyerDescriptor";
import Message from "./Message";

export default class ExchangeStartedBidSellerMessage extends Message {
  public objectsInfos: ObjectItemToSellInBid[];
  public sellerDescriptor: SellerBuyerDescriptor;

  constructor(sellerDescriptor: SellerBuyerDescriptor, objectsInfos: ObjectItemToSellInBid[]) {
    super();
    this.objectsInfos = objectsInfos;
    this.sellerDescriptor = sellerDescriptor;

  }
}
