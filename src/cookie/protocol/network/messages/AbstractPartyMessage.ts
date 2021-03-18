import Message from "@/protocol/network/messages/Message";

export default class AbstractPartyMessage extends Message {
  public partyId: number;

  constructor(partyId = 0) {
    super();
    this.partyId = partyId;

  }
}
