import AbstractPartyMessage from "@/protocol/network/messages/AbstractPartyMessage";

export default class PartyLeaveMessage extends AbstractPartyMessage {
  constructor(partyId = 0) {
    super(partyId);

  }
}
