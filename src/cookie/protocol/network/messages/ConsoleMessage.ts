import Message from "@/protocol/network/messages/Message";

export default class ConsoleMessage extends Message {
  public type: number;
  public content: string;

  constructor(type = 0, content = "") {
    super();
    this.type = type;
    this.content = content;

  }
}
