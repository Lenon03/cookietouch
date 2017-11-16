import BasicNamedAllianceInformations from "./BasicNamedAllianceInformations";
import GuildEmblem from "./GuildEmblem";

export default class AllianceInformations extends BasicNamedAllianceInformations {

  public allianceEmblem: GuildEmblem;

  constructor(allianceId = 0, allianceTag = "", allianceName = "", allianceEmblem: GuildEmblem) {
    super(allianceId, allianceTag, allianceName);
    this.allianceEmblem = allianceEmblem;
  }
}
