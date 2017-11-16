import AllianceInformations from "./AllianceInformations";
import PrismInformation from "./PrismInformation";

export default class AlliancePrismInformation extends PrismInformation {

  public alliance: AllianceInformations;

  constructor(typeid = 0, state = 1, nextvulnerabilitydate = 0, placementdate = 0,
              rewardtokencount = 0, alliance: AllianceInformations) {
    super(typeid, state, nextvulnerabilitydate, placementdate, rewardtokencount);
    this.alliance = alliance;
  }
}
