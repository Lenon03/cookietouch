import Type from "@/protocol/network/types/Type";

export default class ServerSessionConstant extends Type {
  public id: number;

  constructor(id = 0) {
    super();
    this.id = id;
  }
}
