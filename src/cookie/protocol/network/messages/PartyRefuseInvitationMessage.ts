import AbstractPartyMessage from "./AbstractPartyMessage";

export default class PartyRefuseInvitationMessage extends AbstractPartyMessage {
  constructor(partyId = 0) {
    super(partyId);

  }
}
