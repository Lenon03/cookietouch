import Message from "@/protocol/network/messages/Message";
import ObjectItemToSellInBid from "@/protocol/network/types/ObjectItemToSellInBid";

export default class ExchangeBidHouseItemAddOkMessage extends Message {
  public itemInfo: ObjectItemToSellInBid;

  constructor(itemInfo: ObjectItemToSellInBid) {
    super();
    this.itemInfo = itemInfo;

  }
}
