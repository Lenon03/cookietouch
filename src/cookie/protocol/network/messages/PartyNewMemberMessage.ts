import PartyUpdateMessage from "@/protocol/network/messages/PartyUpdateMessage";
import PartyMemberInformations from "@/protocol/network/types/PartyMemberInformations";

export default class PartyNewMemberMessage extends PartyUpdateMessage {
  constructor(partyId = 0, memberInformations: PartyMemberInformations) {
    super(partyId, memberInformations);

  }
}
