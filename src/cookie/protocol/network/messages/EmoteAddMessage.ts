import Message from "@/protocol/network/messages/Message";

export default class EmoteAddMessage extends Message {
  public emoteId: number;

  constructor(emoteId = 0) {
    super();
    this.emoteId = emoteId;

  }
}
