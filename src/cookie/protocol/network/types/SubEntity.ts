import EntityLook from "./EntityLook";

export default class SubEntity {
  public bindingPointCategory: number;
  public bindingPointIndex: number;
  public subEntityLook: EntityLook;

  constructor(bindingPointCategory = 0, bindingPointIndex = 0, subEntityLook: EntityLook = null) {
    this.bindingPointCategory = bindingPointCategory;
    this.bindingPointIndex = bindingPointIndex;
    this.subEntityLook = subEntityLook;
  }
}
