import ObjectItemToSellInBid from "@protocol/network/types/ObjectItemToSellInBid";
import Message from "./Message";

export default class ExchangeBidHouseItemAddOkMessage extends Message {
  public itemInfo: ObjectItemToSellInBid;

  constructor(itemInfo: ObjectItemToSellInBid) {
    super();
    this.itemInfo = itemInfo;

  }
}
