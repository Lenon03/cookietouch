import Message from "./Message";

export default class GuildMemberWarnOnConnectionStateMessage extends Message {
  public enable: boolean;

  constructor(enable = false) {
    super();
    this.enable = enable;

  }
}
