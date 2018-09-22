import ServerSessionConstant from "@/protocol/network/types/ServerSessionConstant";

export default class ServerSessionConstantString extends ServerSessionConstant {
  public value: string;

  constructor(id = 0, value = "") {
    super(id);
    this.value = value;
  }
}
