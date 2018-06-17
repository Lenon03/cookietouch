import Message from "./Message";

export default class GuildMemberOnlineStatusMessage extends Message {
  public memberId: number;
  public online: boolean;

  constructor(memberId = 0, online = false) {
    super();
    this.memberId = memberId;
    this.online = online;

  }
}
