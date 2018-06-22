import Message from "@/protocol/network/messages/Message";
import BidExchangerObjectInfo from "@/protocol/network/types/BidExchangerObjectInfo";

export default class ExchangeTypesItemsExchangerDescriptionForUserMessage extends Message {
  public itemTypeDescriptions: BidExchangerObjectInfo[];

  constructor(itemTypeDescriptions: BidExchangerObjectInfo[]) {
    super();
    this.itemTypeDescriptions = itemTypeDescriptions;

  }
}
