export default class BasicAllianceInformations {

  public allianceid: number;
  public alliancetag: string;

  constructor(allianceid = 0, alliancetag = "") {
    this.allianceid = allianceid;
    this.alliancetag = alliancetag;
  }
}
