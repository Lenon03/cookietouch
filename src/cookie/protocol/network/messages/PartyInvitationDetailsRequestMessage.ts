import AbstractPartyMessage from "@/protocol/network/messages/AbstractPartyMessage";

export default class PartyInvitationDetailsRequestMessage extends AbstractPartyMessage {
  constructor(partyId = 0) {
    super(partyId);

  }
}
