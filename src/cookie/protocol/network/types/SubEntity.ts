import EntityLook from "./EntityLook";
import Type from "./Type";

export default class SubEntity extends Type {
  public bindingPointCategory: number;
  public bindingPointIndex: number;
  public subEntityLook: EntityLook;

  constructor(bindingPointCategory = 0, bindingPointIndex = 0, subEntityLook: EntityLook = null) {
    super();
    this.bindingPointCategory = bindingPointCategory;
    this.bindingPointIndex = bindingPointIndex;
    this.subEntityLook = subEntityLook;
  }
}
