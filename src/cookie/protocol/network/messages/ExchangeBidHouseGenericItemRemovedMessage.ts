import Message from "@/protocol/network/messages/Message";

export default class ExchangeBidHouseGenericItemRemovedMessage extends Message {
  public objGenericId: number;

  constructor(objGenericId = 0) {
    super();
    this.objGenericId = objGenericId;

  }
}
