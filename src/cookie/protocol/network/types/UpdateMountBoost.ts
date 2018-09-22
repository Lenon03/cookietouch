import Type from "@/protocol/network/types/Type";

export default class UpdateMountBoost extends Type {
  public type: number;

  constructor(type = 0) {
    super();
    this.type = type;
  }
}
