import BasicAllianceInformations from "@/protocol/network/types/BasicAllianceInformations";

export default class BasicNamedAllianceInformations extends BasicAllianceInformations {
  public allianceName: string;

  constructor(allianceId = 0, allianceTag = "", allianceName = "") {
    super(allianceId, allianceTag);
    this.allianceName = allianceName;
  }
}
