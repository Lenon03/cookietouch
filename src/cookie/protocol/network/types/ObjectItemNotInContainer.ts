import Item from "@/protocol/network/types/Item";
import ObjectEffect from "@/protocol/network/types/ObjectEffect";

export default class ObjectItemNotInContainer extends Item {

  public effects: ObjectEffect[];
  public objectGid: number;
  public objectUid: number;
  public quantity: number;

  constructor(objectGid = 0, objectUid = 0, quantity = 0, effects: ObjectEffect[]) {
    super();
    this.effects = effects;
    this.effects = effects;
    this.objectGid = objectGid;
    this.objectUid = objectUid;
    this.quantity = quantity;
  }
}
