import ObjectEffect from "@/protocol/network/types/ObjectEffect";
import ObjectItemToSell from "@/protocol/network/types/ObjectItemToSell";

export default class ObjectItemToSellInBid extends ObjectItemToSell {

  public unsoldDelay: number;

  constructor(objectgid = 0, objectuid = 0, quantity = 0, objectprice = 0, unsoldDelay = 0, effects: ObjectEffect[]) {
    super(objectgid, objectuid, quantity, objectprice, effects);
    this.unsoldDelay = unsoldDelay;
  }
}
