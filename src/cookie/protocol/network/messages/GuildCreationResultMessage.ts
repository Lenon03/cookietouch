import Message from "@/protocol/network/messages/Message";

export default class GuildCreationResultMessage extends Message {
  public result: number;

  constructor(result = 0) {
    super();
    this.result = result;

  }
}
