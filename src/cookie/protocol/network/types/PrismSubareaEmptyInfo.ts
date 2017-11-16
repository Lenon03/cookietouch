export default class PrismSubareaEmptyInfo {

  public subareaid: number;
  public allianceid: number;

  constructor(subareaid = 0, allianceid = 0) {
    this.subareaid = subareaid;
    this.allianceid = allianceid;
  }
}
