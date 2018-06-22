import Item from "@/protocol/network/types/Item";
import ObjectEffect from "@/protocol/network/types/ObjectEffect";

export default class ObjectItemMinimalInformation extends Item {

  public effects: ObjectEffect[];
  public objectGid: number;

  constructor(objectGid = 0, effects: ObjectEffect[]) {
    super();
    this.effects = effects;
    this.objectGid = objectGid;
  }
}
