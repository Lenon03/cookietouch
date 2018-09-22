import ProtectedEntityWaitingForHelpInfo from "@/protocol/network/types/ProtectedEntityWaitingForHelpInfo";
import TaxCollectorComplementaryInformations from "@/protocol/network/types/TaxCollectorComplementaryInformations";

export default class TaxCollectorWaitingForHelpInformations extends TaxCollectorComplementaryInformations {
  public waitingForHelpInfo: ProtectedEntityWaitingForHelpInfo;

  constructor(waitingForHelpInfo = new ProtectedEntityWaitingForHelpInfo()) {
    super();
    this.waitingForHelpInfo = waitingForHelpInfo;
  }
}
