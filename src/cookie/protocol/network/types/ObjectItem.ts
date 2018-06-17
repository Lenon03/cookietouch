import Item from "./Item";
import ObjectEffect from "./ObjectEffect";

export default class ObjectItem extends Item {

  public effects: ObjectEffect[];
  public position: number;
  public objectGID: number;
  public objectUID: number;
  public quantity: number;

  constructor(position = 0, objectGID = 0, objectUID = 0, quantity = 0, effects: ObjectEffect[]) {
    super();
    this.effects = effects;
    this.position = position;
    this.objectGID = objectGID;
    this.objectUID = objectUID;
    this.quantity = quantity;
  }
}
