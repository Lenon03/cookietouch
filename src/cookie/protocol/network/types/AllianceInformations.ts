import BasicNamedAllianceInformations from "@/protocol/network/types/BasicNamedAllianceInformations";
import GuildEmblem from "@/protocol/network/types/GuildEmblem";

export default class AllianceInformations extends BasicNamedAllianceInformations {

  public allianceEmblem: GuildEmblem;

  constructor(allianceId = 0, allianceTag = "", allianceName = "", allianceEmblem: GuildEmblem) {
    super(allianceId, allianceTag, allianceName);
    this.allianceEmblem = allianceEmblem;
  }
}
