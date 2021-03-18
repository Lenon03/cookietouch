import Message from "@/protocol/network/messages/Message";
import ObjectItemToSellInBid from "@/protocol/network/types/ObjectItemToSellInBid";
import SellerBuyerDescriptor from "@/protocol/network/types/SellerBuyerDescriptor";

export default class ExchangeStartedBidSellerMessage extends Message {
  public objectsInfos: ObjectItemToSellInBid[];
  public sellerDescriptor: SellerBuyerDescriptor;

  constructor(sellerDescriptor: SellerBuyerDescriptor, objectsInfos: ObjectItemToSellInBid[]) {
    super();
    this.objectsInfos = objectsInfos;
    this.sellerDescriptor = sellerDescriptor;

  }
}
