import PartyMemberRemoveMessage from "./PartyMemberRemoveMessage";
export default class PartyMemberEjectedMessage extends PartyMemberRemoveMessage {
public kickerId: number;
constructor(partyId = 0, leavingPlayerId = 0, kickerId = 0) {
super(partyId, leavingPlayerId );
this.kickerId = kickerId;

}
}
