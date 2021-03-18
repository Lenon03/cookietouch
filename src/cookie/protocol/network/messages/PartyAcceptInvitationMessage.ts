import AbstractPartyMessage from "@/protocol/network/messages/AbstractPartyMessage";

export default class PartyAcceptInvitationMessage extends AbstractPartyMessage {
  constructor(partyId = 0) {
    super(partyId);

  }
}
