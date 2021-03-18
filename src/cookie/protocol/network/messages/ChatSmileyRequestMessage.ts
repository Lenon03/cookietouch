import Message from "@/protocol/network/messages/Message";

export default class ChatSmileyRequestMessage extends Message {
  public smileyId: number;

  constructor(smileyId = 0) {
    super();
    this.smileyId = smileyId;

  }
}
