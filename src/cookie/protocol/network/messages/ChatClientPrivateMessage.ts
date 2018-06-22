import ChatAbstractClientMessage from "@/protocol/network/messages/ChatAbstractClientMessage";

export default class ChatClientPrivateMessage extends ChatAbstractClientMessage {
  public receiver: string;

  constructor(content = "", receiver = "") {
    super(content);
    this.receiver = receiver;

  }
}
