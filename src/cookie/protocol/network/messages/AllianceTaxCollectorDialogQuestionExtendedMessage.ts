import TaxCollectorDialogQuestionExtendedMessage from "@/protocol/network/messages/TaxCollectorDialogQuestionExtendedMessage";
import BasicGuildInformations from "@/protocol/network/types/BasicGuildInformations";
import BasicNamedAllianceInformations from "@/protocol/network/types/BasicNamedAllianceInformations";

export default class AllianceTaxCollectorDialogQuestionExtendedMessage extends TaxCollectorDialogQuestionExtendedMessage {
  public alliance: BasicNamedAllianceInformations;

  constructor(
    guildInfo = new BasicGuildInformations(),
    maxPods = 0,
    prospecting = 0,
    wisdom = 0,
    taxCollectorsCount = 0,
    taxCollectorAttack = 0,
    kamas = 0,
    experience = 0,
    pods = 0,
    itemsValue = 0,
    alliance = new BasicNamedAllianceInformations()
  ) {
    super(
      guildInfo,
      maxPods,
      prospecting,
      wisdom,
      taxCollectorsCount,
      taxCollectorAttack,
      kamas,
      experience,
      pods,
      itemsValue
    );
    this.alliance = alliance;
  }
}
