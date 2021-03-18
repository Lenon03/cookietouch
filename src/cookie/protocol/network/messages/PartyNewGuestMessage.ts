import AbstractPartyEventMessage from "@/protocol/network/messages/AbstractPartyEventMessage";
import PartyGuestInformations from "@/protocol/network/types/PartyGuestInformations";

export default class PartyNewGuestMessage extends AbstractPartyEventMessage {
  public guest: PartyGuestInformations;

  constructor(partyId = 0, guest: PartyGuestInformations) {
    super(partyId);
    this.guest = guest;

  }
}
