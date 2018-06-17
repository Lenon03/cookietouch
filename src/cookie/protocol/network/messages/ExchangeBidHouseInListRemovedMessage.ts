import Message from "./Message";

export default class ExchangeBidHouseInListRemovedMessage extends Message {
  public itemUID: number;

  constructor(itemUID = 0) {
    super();
    this.itemUID = itemUID;

  }
}
