export default class AccountHouseInformations {

  public houseid: number;
  public modelid: number;
  public worldx: number;
  public worldy: number;
  public mapid: number;
  public subareaid: number;

  constructor(houseid = 0, modelid = 0, worldx = 0, worldy = 0, mapid = 0, subareaid = 0) {
    this.houseid = houseid;
    this.modelid = modelid;
    this.worldx = worldx;
    this.worldy = worldy;
    this.mapid = mapid;
    this.subareaid = subareaid;
  }
}
