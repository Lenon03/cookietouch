import AdditionalTaxCollectorInformations from "./AdditionalTaxCollectorInformations";
import EntityLook from "./EntityLook";
import ProtectedEntityWaitingForHelpInfo from "./ProtectedEntityWaitingForHelpInfo";
import TaxCollectorInformations from "./TaxCollectorInformations";

export default class TaxCollectorInformationsInWaitForHelpState extends TaxCollectorInformations {
  public waitingForHelpInfo: ProtectedEntityWaitingForHelpInfo;

  constructor(uniqueId = 0, firtNameId = 0, lastNameId = 0,
              additionalInfos: AdditionalTaxCollectorInformations = null, worldX = 0, worldY = 0, subAreaId = 0,
              state = 0, look: EntityLook = null, kamas = 0, experience = 0, pods = 0,
              itemsValue = 0, waitingForHelpInfo: ProtectedEntityWaitingForHelpInfo = null) {
    super(uniqueId, firtNameId, lastNameId, additionalInfos, worldX,
      worldY, subAreaId, state, look);
    this.waitingForHelpInfo = waitingForHelpInfo;

  }
}
