import PaddockInformations from "./PaddockInformations";

export default class PaddockBuyableInformations extends PaddockInformations {
  public price: number;
  public locked: boolean;

  constructor(maxOutdoorMount = 0, maxItems = 0, price = 0, locked = false) {
    super(maxOutdoorMount, maxItems);
    this.price = price;
    this.locked = locked;

  }
}
