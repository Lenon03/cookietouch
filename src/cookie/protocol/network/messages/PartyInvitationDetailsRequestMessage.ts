import AbstractPartyMessage from "./AbstractPartyMessage";

export default class PartyInvitationDetailsRequestMessage extends AbstractPartyMessage {
  constructor(partyId = 0) {
    super(partyId);

  }
}
