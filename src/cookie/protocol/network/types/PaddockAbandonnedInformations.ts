import PaddockBuyableInformations from "./PaddockBuyableInformations";

export default class PaddockAbandonnedInformations extends PaddockBuyableInformations {
  public guildId: number;

  constructor(maxOutdoorMount = 0, maxItems = 0, price = 0, locked = false, guildId = 0) {
    super(maxOutdoorMount, maxItems, price, locked);
    this.guildId = guildId;

  }
}
