import Message from "./Message";
export default class AllianceInvitationMessage extends Message {
  public targetId: number;
  constructor(targetId = 0) {
    super();
    this.targetId = targetId;

  }
}
