import Item from "./Item";
import ObjectEffect from "./ObjectEffect";

export default class ObjectItemToSell extends Item {

  public effects: ObjectEffect[];
  public objectGid: number;
  public objectUid: number;
  public quantity: number;
  public objectPrice: number;

  constructor(objectGid = 0, objectUid = 0, quantity = 0, objectPrice = 0, effects: ObjectEffect[]) {
    super();
    this.effects = effects;
    this.objectGid = objectGid;
    this.objectUid = objectUid;
    this.quantity = quantity;
    this.objectPrice = objectPrice;
  }
}
