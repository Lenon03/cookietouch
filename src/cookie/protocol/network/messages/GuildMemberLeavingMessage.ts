import Message from "./Message";

export default class GuildMemberLeavingMessage extends Message {
  public kicked: boolean;
  public memberId: number;

  constructor(kicked = false, memberId = 0) {
    super();
    this.kicked = kicked;
    this.memberId = memberId;

  }
}
