import BasicGuildInformations from "@protocol/network/types/BasicGuildInformations";
import TaxCollectorDialogQuestionBasicMessage from "./TaxCollectorDialogQuestionBasicMessage";

export default class TaxCollectorDialogQuestionExtendedMessage extends TaxCollectorDialogQuestionBasicMessage {
  public maxPods: number;
  public prospecting: number;
  public wisdom: number;
  public taxCollectorsCount: number;
  public taxCollectorAttack: number;
  public kamas: number;
  public experience: number;
  public pods: number;
  public itemsValue: number;

  constructor(guildInfo: BasicGuildInformations, maxPods = 0, prospecting = 0, wisdom = 0,
              taxCollectorsCount = 0, taxCollectorAttack = 0, kamas = 0, experience = 0, pods = 0, itemsValue = 0) {
    super(guildInfo);
    this.maxPods = maxPods;
    this.prospecting = prospecting;
    this.wisdom = wisdom;
    this.taxCollectorsCount = taxCollectorsCount;
    this.taxCollectorAttack = taxCollectorAttack;
    this.kamas = kamas;
    this.experience = experience;
    this.pods = pods;
    this.itemsValue = itemsValue;

  }
}
