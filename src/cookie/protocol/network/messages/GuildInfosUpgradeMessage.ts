import Message from "./Message";

export default class GuildInfosUpgradeMessage extends Message {
  public spellId: number[];
  public spellLevel: number[];
  public maxTaxCollectorsCount: number;
  public taxCollectorsCount: number;
  public taxCollectorLifePoints: number;
  public taxCollectorDamagesBonuses: number;
  public taxCollectorPods: number;
  public taxCollectorProspecting: number;
  public taxCollectorWisdom: number;
  public boostPoints: number;

  constructor(maxTaxCollectorsCount = 0, taxCollectorsCount = 0, taxCollectorLifePoints = 0,
              taxCollectorDamagesBonuses = 0, taxCollectorPods = 0, taxCollectorProspecting = 0,
              taxCollectorWisdom = 0, boostPoints = 0, spellId: number[], spellLevel: number[]) {
    super();
    this.spellId = spellId;
    this.spellLevel = spellLevel;
    this.maxTaxCollectorsCount = maxTaxCollectorsCount;
    this.taxCollectorsCount = taxCollectorsCount;
    this.taxCollectorLifePoints = taxCollectorLifePoints;
    this.taxCollectorDamagesBonuses = taxCollectorDamagesBonuses;
    this.taxCollectorPods = taxCollectorPods;
    this.taxCollectorProspecting = taxCollectorProspecting;
    this.taxCollectorWisdom = taxCollectorWisdom;
    this.boostPoints = boostPoints;

  }
}
