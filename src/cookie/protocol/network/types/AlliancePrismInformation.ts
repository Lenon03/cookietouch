import AllianceInformations from "./AllianceInformations";
import PrismInformation from "./PrismInformation";

export default class AlliancePrismInformation extends PrismInformation {

  public alliance: AllianceInformations;

  constructor(typeid = 0, state = 1, nextVulnerabilityDate = 0, placementDate = 0,
              rewardTokenCount = 0, alliance: AllianceInformations) {
    super(typeid, state, nextVulnerabilityDate, placementDate, rewardTokenCount);
    this.alliance = alliance;
  }
}
