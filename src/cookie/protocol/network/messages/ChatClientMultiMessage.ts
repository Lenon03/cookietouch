import ChatAbstractClientMessage from "@/protocol/network/messages/ChatAbstractClientMessage";

export default class ChatClientMultiMessage extends ChatAbstractClientMessage {
  public channel: number;

  constructor(content = "", channel = 0) {
    super(content);
    this.channel = channel;

  }
}
