import PartyGuestInformations from "@/protocol/network/types/PartyGuestInformations";
import PartyInvitationMemberInformations from "@/protocol/network/types/PartyInvitationMemberInformations";
import AbstractPartyMessage from "@/protocol/network/messages/AbstractPartyMessage";

export default class PartyInvitationDetailsMessage extends AbstractPartyMessage {
  public members: PartyInvitationMemberInformations[];
  public guests: PartyGuestInformations[];
  public partyType: number;
  public fromId: number;
  public fromName: string;
  public leaderId: number;

  constructor(partyId = 0, partyType = 0, fromId = 0, fromName = "", leaderId = 0,
              members: PartyInvitationMemberInformations[], guests: PartyGuestInformations[]) {
    super(partyId);
    this.members = members;
    this.guests = guests;
    this.partyType = partyType;
    this.fromId = fromId;
    this.fromName = fromName;
    this.leaderId = leaderId;

  }
}
