import Message from "@/protocol/network/messages/Message";

export default class AdminCommandMessage extends Message {
  public content: string;

  constructor(content = "") {
    super();
    this.content = content;

  }
}
