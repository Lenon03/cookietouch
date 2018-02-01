import Message from "./Message";

export default class GuildInvitationStateRecrutedMessage extends Message {
  public invitationState: number;

  constructor(invitationState = 0) {
    super();
    this.invitationState = invitationState;

  }
}
