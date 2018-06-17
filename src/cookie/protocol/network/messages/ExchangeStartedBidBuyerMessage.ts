import SellerBuyerDescriptor from "@protocol/network/types/SellerBuyerDescriptor";
import Message from "./Message";

export default class ExchangeStartedBidBuyerMessage extends Message {
  public buyerDescriptor: SellerBuyerDescriptor;

  constructor(buyerDescriptor: SellerBuyerDescriptor) {
    super();
    this.buyerDescriptor = buyerDescriptor;

  }
}
