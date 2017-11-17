import ObjectEffect from "./ObjectEffect";

export default class BidExchangerObjectInfo {
  public effects: ObjectEffect[];
  public prices: number[];
  public objectUID: number;

  constructor(objectUID = 0, effects: ObjectEffect[] = null, prices: number[] = null) {
    this.objectUID = objectUID;
    this.effects = effects;
    this.prices = prices;
  }
}
