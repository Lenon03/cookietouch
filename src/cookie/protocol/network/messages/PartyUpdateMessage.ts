import AbstractPartyEventMessage from "@/protocol/network/messages/AbstractPartyEventMessage";
import PartyMemberInformations from "@/protocol/network/types/PartyMemberInformations";

export default class PartyUpdateMessage extends AbstractPartyEventMessage {
  public memberInformations: PartyMemberInformations;

  constructor(partyId = 0, memberInformations: PartyMemberInformations) {
    super(partyId);
    this.memberInformations = memberInformations;

  }
}
