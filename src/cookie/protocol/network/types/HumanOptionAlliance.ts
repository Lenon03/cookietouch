import AllianceInformations from "./AllianceInformations";
import HumanOption from "./HumanOption";
export default class HumanOptionAlliance extends HumanOption {
  public allianceInformations: AllianceInformations;
  public aggressable: number;
  constructor(allianceInformations: AllianceInformations = null, aggressable = 0) {
    super();
    this.allianceInformations = allianceInformations;
    this.aggressable = aggressable;

  }
}
