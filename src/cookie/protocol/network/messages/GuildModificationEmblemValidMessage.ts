import GuildEmblem from "@protocol/network/types/GuildEmblem";
import Message from "./Message";

export default class GuildModificationEmblemValidMessage extends Message {
  public guildEmblem: GuildEmblem;

  constructor(guildEmblem: GuildEmblem) {
    super();
    this.guildEmblem = guildEmblem;

  }
}
