import AllianceInformations from "@/protocol/network/types/AllianceInformations";
import GuildEmblem from "@/protocol/network/types/GuildEmblem";

export default class AllianceFactSheetInformations extends AllianceInformations {

  public creationDate: number;

  constructor(allianceId = 0, allianceTag = "", allianceName = "", allianceEmblem: GuildEmblem, creationDate = 0) {
    super(allianceId, allianceTag, allianceName, allianceEmblem);
    this.creationDate = creationDate;
  }
}
