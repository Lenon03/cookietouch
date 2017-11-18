import AbstractPartyMessage from "./AbstractPartyMessage";
export default class PartyCannotJoinErrorMessage extends AbstractPartyMessage {
public reason: number;
constructor(partyId = 0, reason = 0) {
super(partyId );
this.reason = reason;

}
}
