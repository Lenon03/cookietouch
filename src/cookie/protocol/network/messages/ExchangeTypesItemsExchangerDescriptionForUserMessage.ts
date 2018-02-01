import BidExchangerObjectInfo from "@protocol/network/types/BidExchangerObjectInfo";
import Message from "./Message";

export default class ExchangeTypesItemsExchangerDescriptionForUserMessage extends Message {
  public itemTypeDescriptions: BidExchangerObjectInfo[];

  constructor(itemTypeDescriptions: BidExchangerObjectInfo[]) {
    super();
    this.itemTypeDescriptions = itemTypeDescriptions;

  }
}
