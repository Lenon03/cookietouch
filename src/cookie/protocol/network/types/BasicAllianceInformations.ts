export default class BasicAllianceInformations {

  public allianceId: number;
  public allianceTag: string;

  constructor(allianceId = 0, allianceTag = "") {
    this.allianceId = allianceId;
    this.allianceTag = allianceTag;
  }
}
