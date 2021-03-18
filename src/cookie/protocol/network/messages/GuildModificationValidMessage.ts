import Message from "@/protocol/network/messages/Message";
import GuildEmblem from "@/protocol/network/types/GuildEmblem";

export default class GuildModificationValidMessage extends Message {
  public guildName: string;
  public guildEmblem: GuildEmblem;

  constructor(guildName = "", guildEmblem: GuildEmblem) {
    super();
    this.guildName = guildName;
    this.guildEmblem = guildEmblem;

  }
}
