import Message from "@/protocol/network/messages/Message";
import SellerBuyerDescriptor from "@/protocol/network/types/SellerBuyerDescriptor";

export default class ExchangeStartedBidBuyerMessage extends Message {
  public buyerDescriptor: SellerBuyerDescriptor;

  constructor(buyerDescriptor: SellerBuyerDescriptor) {
    super();
    this.buyerDescriptor = buyerDescriptor;

  }
}
