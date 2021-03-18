import AbstractPartyMessage from "@/protocol/network/messages/AbstractPartyMessage";

export default class PartyRestrictedMessage extends AbstractPartyMessage {
  public restricted: boolean;

  constructor(partyId = 0, restricted = false) {
    super(partyId);
    this.restricted = restricted;

  }
}
