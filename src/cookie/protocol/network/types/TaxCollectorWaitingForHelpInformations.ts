import ProtectedEntityWaitingForHelpInfo from "./ProtectedEntityWaitingForHelpInfo";
import TaxCollectorComplementaryInformations from "./TaxCollectorComplementaryInformations";

export default class TaxCollectorWaitingForHelpInformations extends TaxCollectorComplementaryInformations {
  public waitingForHelpInfo: ProtectedEntityWaitingForHelpInfo;

  constructor(waitingForHelpInfo: ProtectedEntityWaitingForHelpInfo = null) {
    super();
    this.waitingForHelpInfo = waitingForHelpInfo;

  }
}
