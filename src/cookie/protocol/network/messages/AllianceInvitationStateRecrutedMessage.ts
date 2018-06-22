import Message from "@/protocol/network/messages/Message";

export default class AllianceInvitationStateRecrutedMessage extends Message {
  public invitationState: number;

  constructor(invitationState = 0) {
    super();
    this.invitationState = invitationState;

  }
}
