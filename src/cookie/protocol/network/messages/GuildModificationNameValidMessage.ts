import Message from "./Message";

export default class GuildModificationNameValidMessage extends Message {
  public guildName: string;

  constructor(guildName = "") {
    super();
    this.guildName = guildName;

  }
}
