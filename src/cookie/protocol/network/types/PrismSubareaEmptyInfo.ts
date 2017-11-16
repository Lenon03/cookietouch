export default class PrismSubareaEmptyInfo {

  public subAreaId: number;
  public allianceId: number;

  constructor(subAreaId = 0, allianceId = 0) {
    this.subAreaId = subAreaId;
    this.allianceId = allianceId;
  }
}
