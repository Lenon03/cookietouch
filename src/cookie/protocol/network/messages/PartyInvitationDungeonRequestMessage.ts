import PartyInvitationRequestMessage from "@/protocol/network/messages/PartyInvitationRequestMessage";

export default class PartyInvitationDungeonRequestMessage extends PartyInvitationRequestMessage {
  public dungeonId: number;

  constructor(name = "", dungeonId = 0) {
    super(name);
    this.dungeonId = dungeonId;

  }
}
