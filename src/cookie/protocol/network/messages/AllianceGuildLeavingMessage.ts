import Message from "./Message";

export default class AllianceGuildLeavingMessage extends Message {
  public kicked: boolean;
  public guildId: number;

  constructor(kicked = false, guildId = 0) {
    super();
    this.kicked = kicked;
    this.guildId = guildId;

  }
}
