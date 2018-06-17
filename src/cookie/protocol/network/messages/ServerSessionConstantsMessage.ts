import ServerSessionConstant from "@protocol/network/types/ServerSessionConstant";
import Message from "./Message";

export default class ServerSessionConstantsMessage extends Message {
  public variables: ServerSessionConstant[];

  constructor(variables: ServerSessionConstant[]) {
    super();
    this.variables = variables;

  }
}
