import PartyGuestInformations from "@/protocol/network/types/PartyGuestInformations";
import PartyInvitationMemberInformations from "@/protocol/network/types/PartyInvitationMemberInformations";
import PartyInvitationDetailsMessage from "@/protocol/network/messages/PartyInvitationDetailsMessage";

export default class PartyInvitationDungeonDetailsMessage extends PartyInvitationDetailsMessage {
  public playersDungeonReady: boolean[];
  public dungeonId: number;

  constructor(partyId = 0, partyType = 0, fromId = 0, fromName = "", leaderId = 0,
              dungeonId = 0, members: PartyInvitationMemberInformations[], guests: PartyGuestInformations[], playersDungeonReady: boolean[]) {
    super(partyId, partyType, fromId, fromName, leaderId, members, guests);
    this.playersDungeonReady = playersDungeonReady;
    this.dungeonId = dungeonId;

  }
}
