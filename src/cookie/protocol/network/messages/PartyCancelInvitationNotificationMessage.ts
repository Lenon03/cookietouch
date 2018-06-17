import AbstractPartyEventMessage from "./AbstractPartyEventMessage";

export default class PartyCancelInvitationNotificationMessage extends AbstractPartyEventMessage {
  public cancelerId: number;
  public guestId: number;

  constructor(partyId = 0, cancelerId = 0, guestId = 0) {
    super(partyId);
    this.cancelerId = cancelerId;
    this.guestId = guestId;

  }
}
