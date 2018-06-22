import BasicNamedAllianceInformations from "@/protocol/network/types/BasicNamedAllianceInformations";
import GuildEmblem from "@/protocol/network/types/GuildEmblem";
import GuildInformations from "@/protocol/network/types/GuildInformations";

export default class AlliancedGuildFactSheetInformations extends GuildInformations {

  public allianceInfos: BasicNamedAllianceInformations;

  constructor(guildId = 0, guildName = "", guildEmblem: GuildEmblem,
              allianceInfos: BasicNamedAllianceInformations) {
    super(guildId, guildName, guildEmblem);
    this.allianceInfos = allianceInfos;
  }
}
