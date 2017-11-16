import BasicGuildInformations from "./BasicGuildInformations";
import GuildEmblem from "./GuildEmblem";

export default class GuildInformations extends BasicGuildInformations {

  public guildemblem: GuildEmblem;

  constructor(guildid = 0, guildname = "", guildemblem: GuildEmblem) {
    super(guildid, guildname);
    this.guildemblem = guildemblem;
  }
}
