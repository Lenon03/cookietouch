import Item from "./Item";
import ObjectEffect from "./ObjectEffect";

export default class ObjectItemMinimalInformation extends Item {

  public effects: ObjectEffect[];
  public objectGid: number;

  constructor(objectGid = 0, effects: ObjectEffect[]) {
    super();
    this.effects = effects;
    this.objectGid = objectGid;
  }
}
