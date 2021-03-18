import AbstractPartyEventMessage from "@/protocol/network/messages/AbstractPartyEventMessage";

export default class PartyLeaderUpdateMessage extends AbstractPartyEventMessage {
  public partyLeaderId: number;

  constructor(partyId = 0, partyLeaderId = 0) {
    super(partyId);
    this.partyLeaderId = partyLeaderId;

  }
}
