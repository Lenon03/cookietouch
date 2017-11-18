import PartyInvitationMessage from "./PartyInvitationMessage";
export default class PartyInvitationDungeonMessage extends PartyInvitationMessage {
public dungeonId: number;
constructor(partyId = 0, partyType = 0, maxParticipants = 0, fromId = 0, fromName = "", toId = 0, dungeonId = 0) {
super(partyId, partyType, maxParticipants, fromId, fromName, toId );
this.dungeonId = dungeonId;

}
}
