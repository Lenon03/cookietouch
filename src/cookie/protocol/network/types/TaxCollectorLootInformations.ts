import TaxCollectorComplementaryInformations from "./TaxCollectorComplementaryInformations";
export default class TaxCollectorLootInformations extends TaxCollectorComplementaryInformations {
  public kamas: number;
  public experience: number;
  public pods: number;
  public itemsValue: number;
  constructor(kamas = 0, experience = 0, pods = 0, itemsValue = 0) {
    super();
    this.kamas = kamas;
    this.experience = experience;
    this.pods = pods;
    this.itemsValue = itemsValue;

  }
}
