import Message from "./Message";

export default class GuildFactsErrorMessage extends Message {
  public guildId: number;

  constructor(guildId = 0) {
    super();
    this.guildId = guildId;

  }
}
