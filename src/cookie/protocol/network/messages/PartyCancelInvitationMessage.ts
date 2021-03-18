import AbstractPartyMessage from "@/protocol/network/messages/AbstractPartyMessage";

export default class PartyCancelInvitationMessage extends AbstractPartyMessage {
  public guestId: number;

  constructor(partyId = 0, guestId = 0) {
    super(partyId);
    this.guestId = guestId;

  }
}
