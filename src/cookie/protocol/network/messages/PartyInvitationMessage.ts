import AbstractPartyMessage from "./AbstractPartyMessage";

export default class PartyInvitationMessage extends AbstractPartyMessage {
  public partyType: number;
  public maxParticipants: number;
  public fromId: number;
  public fromName: string;
  public toId: number;

  constructor(partyId = 0, partyType = 0, maxParticipants = 0, fromId = 0, fromName = "", toId = 0) {
    super(partyId);
    this.partyType = partyType;
    this.maxParticipants = maxParticipants;
    this.fromId = fromId;
    this.fromName = fromName;
    this.toId = toId;

  }
}
