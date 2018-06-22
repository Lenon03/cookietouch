import ObjectEffect from "@/protocol/network/types/ObjectEffect";
import Type from "@/protocol/network/types/Type";

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
