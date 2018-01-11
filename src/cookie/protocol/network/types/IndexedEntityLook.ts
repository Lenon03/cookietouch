import EntityLook from "./EntityLook";
import Type from "./Type";

export default class IndexedEntityLook extends Type {
  public look: EntityLook;
  public index: number;
  constructor(look: EntityLook = null, index = 0) {
    super();
    this.look = look;
    this.index = index;
  }
}
