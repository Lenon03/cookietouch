import Message from "@/protocol/network/messages/Message";

export default class EmotePlayAbstractMessage extends Message {
  public emoteId: number;
  public emoteStartTime: number;

  constructor(emoteId = 0, emoteStartTime = 0) {
    super();
    this.emoteId = emoteId;
    this.emoteStartTime = emoteStartTime;

  }
}
