import BasicGuildInformations from "./BasicGuildInformations";
import GuildEmblem from "./GuildEmblem";

export default class GuildInformations extends BasicGuildInformations {

  public guildEmblem: GuildEmblem;

  constructor(guildid = 0, guildname = "", guildEmblem: GuildEmblem) {
    super(guildid, guildname);
    this.guildEmblem = guildEmblem;
  }
}
