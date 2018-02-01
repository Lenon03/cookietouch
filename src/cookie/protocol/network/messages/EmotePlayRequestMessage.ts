import Message from "./Message";

export default class EmotePlayRequestMessage extends Message {
  public emoteId: number;

  constructor(emoteId = 0) {
    super();
    this.emoteId = emoteId;

  }
}
