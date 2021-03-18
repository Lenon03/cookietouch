import AbstractPartyEventMessage from "@/protocol/network/messages/AbstractPartyEventMessage";

export default class PartyMemberRemoveMessage extends AbstractPartyEventMessage {
  public leavingPlayerId: number;

  constructor(partyId = 0, leavingPlayerId = 0) {
    super(partyId);
    this.leavingPlayerId = leavingPlayerId;

  }
}
