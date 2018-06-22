import Message from "@/protocol/network/messages/Message";

export default class GuildInvitationMessage extends Message {
  public targetId: number;

  constructor(targetId = 0) {
    super();
    this.targetId = targetId;

  }
}
