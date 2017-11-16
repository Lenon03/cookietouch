export default class PrismInformation {

  public typeId: number;
  public state: number;
  public nextVulnerabilityDate: number;
  public placementDate: number;
  public rewardTokenCount: number;

  constructor(typeId = 0, state = 1, nextVulnerabilityDate = 0, placementDate = 0, rewardTokenCount = 0) {
    this.typeId = typeId;
    this.state = state;
    this.nextVulnerabilityDate = nextVulnerabilityDate;
    this.placementDate = placementDate;
    this.rewardTokenCount = rewardTokenCount;
  }
}
