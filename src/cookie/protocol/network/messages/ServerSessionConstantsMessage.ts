import Message from "@/protocol/network/messages/Message";
import ServerSessionConstant from "@/protocol/network/types/ServerSessionConstant";

export default class ServerSessionConstantsMessage extends Message {
  public variables: ServerSessionConstant[];

  constructor(variables: ServerSessionConstant[]) {
    super();
    this.variables = variables;

  }
}
