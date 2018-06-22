import AbstractPartyMessage from "@/protocol/network/messages/AbstractPartyMessage";

export default class PartyInvitationCancelledForGuestMessage extends AbstractPartyMessage {
  public cancelerId: number;

  constructor(partyId = 0, cancelerId = 0) {
    super(partyId);
    this.cancelerId = cancelerId;

  }
}
