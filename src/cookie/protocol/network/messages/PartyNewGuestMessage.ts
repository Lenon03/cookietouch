import PartyGuestInformations from "@/protocol/network/types/PartyGuestInformations";
import AbstractPartyEventMessage from "@/protocol/network/messages/AbstractPartyEventMessage";

export default class PartyNewGuestMessage extends AbstractPartyEventMessage {
  public guest: PartyGuestInformations;

  constructor(partyId = 0, guest: PartyGuestInformations) {
    super(partyId);
    this.guest = guest;

  }
}
