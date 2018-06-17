import GuildEmblem from "@protocol/network/types/GuildEmblem";
import Message from "./Message";

export default class GuildModificationValidMessage extends Message {
  public guildName: string;
  public guildEmblem: GuildEmblem;

  constructor(guildName = "", guildEmblem: GuildEmblem) {
    super();
    this.guildName = guildName;
    this.guildEmblem = guildEmblem;

  }
}
