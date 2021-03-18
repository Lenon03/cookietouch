import UpdateMountBoost from "@/protocol/network/types/UpdateMountBoost";

export default class UpdateMountIntBoost extends UpdateMountBoost {
  public value: number;

  constructor(type = 0, value = 0) {
    super(type);
    this.value = value;
  }
}
