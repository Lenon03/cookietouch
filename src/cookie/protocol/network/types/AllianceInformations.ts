import BasicNamedAllianceInformations from "./BasicNamedAllianceInformations";
import GuildEmblem from "./GuildEmblem";

export default class AllianceInformations extends BasicNamedAllianceInformations {

  public allianceemblem: GuildEmblem;

  constructor(allianceid = 0, alliancetag = "", alliancename = "", allianceemblem: GuildEmblem) {
    super(allianceid, alliancetag, alliancename);
    this.allianceemblem = allianceemblem;
  }
}
