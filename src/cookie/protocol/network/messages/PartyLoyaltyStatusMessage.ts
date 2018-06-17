import AbstractPartyMessage from "./AbstractPartyMessage";

export default class PartyLoyaltyStatusMessage extends AbstractPartyMessage {
  public loyal: boolean;

  constructor(partyId = 0, loyal = false) {
    super(partyId);
    this.loyal = loyal;

  }
}
