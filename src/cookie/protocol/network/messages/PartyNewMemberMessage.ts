import PartyMemberInformations from "@/protocol/network/types/PartyMemberInformations";
import PartyUpdateMessage from "@/protocol/network/messages/PartyUpdateMessage";

export default class PartyNewMemberMessage extends PartyUpdateMessage {
  constructor(partyId = 0, memberInformations: PartyMemberInformations) {
    super(partyId, memberInformations);

  }
}
