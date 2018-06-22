import Message from "@/protocol/network/messages/Message";

export default class PrismSetSabotagedRequestMessage extends Message {
  public subAreaId: number;

  constructor(subAreaId = 0) {
    super();
    this.subAreaId = subAreaId;

  }
}
