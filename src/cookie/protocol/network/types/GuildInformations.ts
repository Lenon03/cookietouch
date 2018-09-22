import BasicGuildInformations from "@/protocol/network/types/BasicGuildInformations";
import GuildEmblem from "@/protocol/network/types/GuildEmblem";

export default class GuildInformations extends BasicGuildInformations {
  public guildEmblem: GuildEmblem;

  constructor(guildid = 0, guildname = "", guildEmblem = new GuildEmblem()) {
    super(guildid, guildname);
    this.guildEmblem = guildEmblem;
  }
}
