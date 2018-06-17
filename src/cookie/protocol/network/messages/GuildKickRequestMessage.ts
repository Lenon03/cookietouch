import Message from "./Message";

export default class GuildKickRequestMessage extends Message {
  public kickedId: number;

  constructor(kickedId = 0) {
    super();
    this.kickedId = kickedId;

  }
}
