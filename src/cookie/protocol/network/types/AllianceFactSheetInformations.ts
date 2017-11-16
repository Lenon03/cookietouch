import AllianceInformations from "./AllianceInformations";
import GuildEmblem from "./GuildEmblem";

export default class AllianceFactSheetInformations extends AllianceInformations {

  public creationdate: number;

  constructor(allianceid = 0, alliancetag = "", alliancename = "", allianceemblem: GuildEmblem, creationdate = 0) {
    super(allianceid, alliancetag, alliancename, allianceemblem);
    this.creationdate = creationdate;
  }
}
