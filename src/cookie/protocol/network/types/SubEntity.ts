import EntityLook from "@/protocol/network/types/EntityLook";
import Type from "@/protocol/network/types/Type";

export default class SubEntity extends Type {
  public bindingPointCategory: number;
  public bindingPointIndex: number;
  public subEntityLook: EntityLook;

  constructor(
    bindingPointCategory = 0,
    bindingPointIndex = 0,
    subEntityLook = new EntityLook()
  ) {
    super();
    this.bindingPointCategory = bindingPointCategory;
    this.bindingPointIndex = bindingPointIndex;
    this.subEntityLook = subEntityLook;
  }
}
