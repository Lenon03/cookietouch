import BasicGuildInformations from "@protocol/network/types/BasicGuildInformations";
import BasicNamedAllianceInformations from "@protocol/network/types/BasicNamedAllianceInformations";
import TaxCollectorDialogQuestionExtendedMessage from "./TaxCollectorDialogQuestionExtendedMessage";

export default class AllianceTaxCollectorDialogQuestionExtendedMessage
  extends TaxCollectorDialogQuestionExtendedMessage {
  public alliance: BasicNamedAllianceInformations;

  constructor(guildInfo: BasicGuildInformations, maxPods = 0, prospecting = 0,
              wisdom = 0, taxCollectorsCount = 0, taxCollectorAttack = 0, kamas = 0,
              experience = 0, pods = 0, itemsValue = 0, alliance: BasicNamedAllianceInformations) {
    super(guildInfo, maxPods, prospecting, wisdom, taxCollectorsCount,
      taxCollectorAttack, kamas, experience, pods, itemsValue);
    this.alliance = alliance;

  }
}
