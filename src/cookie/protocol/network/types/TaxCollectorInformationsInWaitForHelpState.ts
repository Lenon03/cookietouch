import AdditionalTaxCollectorInformations from "@/protocol/network/types/AdditionalTaxCollectorInformations";
import EntityLook from "@/protocol/network/types/EntityLook";
import ProtectedEntityWaitingForHelpInfo from "@/protocol/network/types/ProtectedEntityWaitingForHelpInfo";
import TaxCollectorInformations from "@/protocol/network/types/TaxCollectorInformations";

export default class TaxCollectorInformationsInWaitForHelpState extends TaxCollectorInformations {
  public waitingForHelpInfo: ProtectedEntityWaitingForHelpInfo;

  constructor(
    uniqueId = 0,
    firtNameId = 0,
    lastNameId = 0,
    additionalInfos = new AdditionalTaxCollectorInformations(),
    worldX = 0,
    worldY = 0,
    subAreaId = 0,
    state = 0,
    look = new EntityLook(),
    kamas = 0,
    experience = 0,
    pods = 0,
    itemsValue = 0,
    waitingForHelpInfo = new ProtectedEntityWaitingForHelpInfo()
  ) {
    super(
      uniqueId,
      firtNameId,
      lastNameId,
      additionalInfos,
      worldX,
      worldY,
      subAreaId,
      state,
      look
    );
    this.waitingForHelpInfo = waitingForHelpInfo;
  }
}
