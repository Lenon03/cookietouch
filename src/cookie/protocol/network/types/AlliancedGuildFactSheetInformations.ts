import BasicNamedAllianceInformations from "./BasicNamedAllianceInformations";
import GuildEmblem from "./GuildEmblem";
import GuildInformations from "./GuildInformations";

export default class AlliancedGuildFactSheetInformations extends GuildInformations {

  public allianceinfos: BasicNamedAllianceInformations;

  constructor(guildid = 0, guildname = "", guildemblem: GuildEmblem,
              allianceinfos: BasicNamedAllianceInformations) {
    super(guildid, guildname, guildemblem);
    this.allianceinfos = allianceinfos;
  }
}
