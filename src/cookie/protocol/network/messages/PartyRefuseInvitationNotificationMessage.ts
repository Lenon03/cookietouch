import AbstractPartyEventMessage from "./AbstractPartyEventMessage";
export default class PartyRefuseInvitationNotificationMessage extends AbstractPartyEventMessage {
public guestId: number;
constructor(partyId = 0, guestId = 0) {
super(partyId );
this.guestId = guestId;

}
}
