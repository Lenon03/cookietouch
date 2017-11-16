import BasicAllianceInformations from "./BasicAllianceInformations";

export default class BasicNamedAllianceInformations extends BasicAllianceInformations {

  public alliancename: string;

  constructor(allianceid = 0, alliancetag = "", alliancename = "") {
    super(allianceid, alliancetag);
    this.alliancename = alliancename;
  }
}
