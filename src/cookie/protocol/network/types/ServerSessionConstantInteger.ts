import ServerSessionConstant from "./ServerSessionConstant";

export default class ServerSessionConstantInteger extends ServerSessionConstant {
  public value: number;

  constructor(id = 0, value = 0) {
    super(id);
    this.value = value;

  }
}
