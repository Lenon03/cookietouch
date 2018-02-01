import AbstractPartyMessage from "./AbstractPartyMessage";

export default class PartyAbdicateThroneMessage extends AbstractPartyMessage {
  public playerId: number;

  constructor(partyId = 0, playerId = 0) {
    super(partyId);
    this.playerId = playerId;

  }
}
