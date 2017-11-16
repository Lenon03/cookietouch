export default class PrismInformation {

  public typeid: number;
  public state: number;
  public nextvulnerabilitydate: number;
  public placementdate: number;
  public rewardtokencount: number;

  constructor(typeid = 0, state = 1, nextvulnerabilitydate = 0, placementdate = 0, rewardtokencount = 0) {
    this.typeid = typeid;
    this.state = state;
    this.nextvulnerabilitydate = nextvulnerabilitydate;
    this.placementdate = placementdate;
    this.rewardtokencount = rewardtokencount;
  }
}
