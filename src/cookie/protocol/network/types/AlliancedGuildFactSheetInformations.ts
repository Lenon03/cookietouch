import BasicNamedAllianceInformations from "./BasicNamedAllianceInformations";
import GuildEmblem from "./GuildEmblem";
import GuildInformations from "./GuildInformations";

export default class AlliancedGuildFactSheetInformations extends GuildInformations {

  public allianceInfos: BasicNamedAllianceInformations;

  constructor(guildId = 0, guildName = "", guildEmblem: GuildEmblem,
              allianceInfos: BasicNamedAllianceInformations) {
    super(guildId, guildName, guildEmblem);
    this.allianceInfos = allianceInfos;
  }
}
