import Type from "@/protocol/network/types/Type";

export default class PlayerStatus extends Type {

  public statusId: number;

  constructor(statusId = 1) {
    super();
    this.statusId = statusId;
  }
}
