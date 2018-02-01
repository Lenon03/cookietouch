import AbstractPartyMessage from "./AbstractPartyMessage";

export default class PartyKickedByMessage extends AbstractPartyMessage {
  public kickerId: number;

  constructor(partyId = 0, kickerId = 0) {
    super(partyId);
    this.kickerId = kickerId;

  }
}
