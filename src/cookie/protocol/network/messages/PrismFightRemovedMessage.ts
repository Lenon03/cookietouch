import Message from "@/protocol/network/messages/Message";

export default class PrismFightRemovedMessage extends Message {
  public subAreaId: number;

  constructor(subAreaId = 0) {
    super();
    this.subAreaId = subAreaId;

  }
}
