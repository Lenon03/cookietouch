import Type from "@/protocol/network/types/Type";

export default class ObjectEffect extends Type {

  public actionId: number;

  constructor(actionId = 0) {
    super();
    this.actionId = actionId;
  }
}
