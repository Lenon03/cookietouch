import PartyGuestInformations from "@protocol/network/types/PartyGuestInformations";
import PartyMemberInformations from "@protocol/network/types/PartyMemberInformations";
import AbstractPartyMessage from "./AbstractPartyMessage";

export default class PartyJoinMessage extends AbstractPartyMessage {
  public members: PartyMemberInformations[];
  public guests: PartyGuestInformations[];
  public partyType: number;
  public partyLeaderId: number;
  public maxParticipants: number;
  public restricted: boolean;

  constructor(partyId = 0, partyType = 0, partyLeaderId = 0, maxParticipants = 0,
              restricted = false, members: PartyMemberInformations[], guests: PartyGuestInformations[]) {
    super(partyId);
    this.members = members;
    this.guests = guests;
    this.partyType = partyType;
    this.partyLeaderId = partyLeaderId;
    this.maxParticipants = maxParticipants;
    this.restricted = restricted;

  }
}
