import PartyInvitationRequestMessage from "@/protocol/network/messages/PartyInvitationRequestMessage";

export default class PartyInvitationArenaRequestMessage extends PartyInvitationRequestMessage {
  constructor(name = "") {
    super(name);

  }
}
