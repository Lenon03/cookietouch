import ExchangeBidPriceMessage from "@/protocol/network/messages/ExchangeBidPriceMessage";

export default class ExchangeBidPriceForSellerMessage extends ExchangeBidPriceMessage {
  public minimalPrices: number[];
  public allIdentical: boolean;

  constructor(genericId = 0, averagePrice = 0, allIdentical = false, minimalPrices: number[]) {
    super(genericId, averagePrice);
    this.minimalPrices = minimalPrices;
    this.allIdentical = allIdentical;

  }
}
