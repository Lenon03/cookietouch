import ObjectItemToSellInBid from "@/protocol/network/types/ObjectItemToSellInBid";
import Message from "@/protocol/network/messages/Message";

export default class ExchangeBidHouseItemAddOkMessage extends Message {
  public itemInfo: ObjectItemToSellInBid;

  constructor(itemInfo: ObjectItemToSellInBid) {
    super();
    this.itemInfo = itemInfo;

  }
}
