import Type from "@/protocol/network/types/Type";

export default class ObjectItemInRolePlay extends Type {

  public cellId: number;
  public objectGid: number;

  constructor(cellId = 0, objectGid = 0) {
    super();
    this.cellId = cellId;
    this.objectGid = objectGid;
  }
}
