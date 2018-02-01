import AbstractPartyMessage from "./AbstractPartyMessage";

export default class PartyAcceptInvitationMessage extends AbstractPartyMessage {
  constructor(partyId = 0) {
    super(partyId);

  }
}
