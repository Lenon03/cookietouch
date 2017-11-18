import EntityLook from "./EntityLook";
export default class IndexedEntityLook {
  public look: EntityLook;
  public index: number;
  constructor(look: EntityLook = null, index = 0) {

    this.look = look;
    this.index = index;

  }
}
