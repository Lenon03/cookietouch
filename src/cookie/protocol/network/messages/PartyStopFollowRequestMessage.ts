import AbstractPartyMessage from "./AbstractPartyMessage";

export default class PartyStopFollowRequestMessage extends AbstractPartyMessage {
  constructor(partyId = 0) {
    super(partyId);

  }
}
