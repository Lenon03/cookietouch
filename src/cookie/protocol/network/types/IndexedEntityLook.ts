import EntityLook from "@/protocol/network/types/EntityLook";
import Type from "@/protocol/network/types/Type";

export default class IndexedEntityLook extends Type {
  public look: EntityLook;
  public index: number;

  constructor(look: EntityLook = null, index = 0) {
    super();
    this.look = look;
    this.index = index;
  }
}
