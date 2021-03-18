import Item from "@/protocol/network/types/Item";
import ObjectEffect from "@/protocol/network/types/ObjectEffect";

export default class ObjectItemToSell extends Item {

  public effects: ObjectEffect[];
  public objectGID: number;
  public objectUID: number;
  public quantity: number;
  public objectPrice: number;

  constructor(objectGID = 0, objectUID = 0, quantity = 0, objectPrice = 0, effects: ObjectEffect[]) {
    super();
    this.effects = effects;
    this.objectGID = objectGID;
    this.objectUID = objectUID;
    this.quantity = quantity;
    this.objectPrice = objectPrice;
  }
}
