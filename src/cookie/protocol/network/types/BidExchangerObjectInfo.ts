import ObjectEffect from "./ObjectEffect";
import Type from "./Type";

export default class BidExchangerObjectInfo extends Type {
  public effects: ObjectEffect[];
  public prices: number[];
  public objectUID: number;

  constructor(objectUID = 0, effects: ObjectEffect[] = null, prices: number[] = null) {
    super();
    this.objectUID = objectUID;
    this.effects = effects;
    this.prices = prices;
  }
}
