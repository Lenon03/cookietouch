import Message from "@/protocol/network/messages/Message";

export default class HouseBuyRequestMessage extends Message {
  public proposedPrice: number;

  constructor(proposedPrice = 0) {
    super();
    this.proposedPrice = proposedPrice;

  }
}
