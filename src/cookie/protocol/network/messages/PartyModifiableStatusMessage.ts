import AbstractPartyMessage from "./AbstractPartyMessage";

export default class PartyModifiableStatusMessage extends AbstractPartyMessage {
  public enabled: boolean;

  constructor(partyId = 0, enabled = false) {
    super(partyId);
    this.enabled = enabled;

  }
}
