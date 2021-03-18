import ChatAbstractServerMessage from "@/protocol/network/messages/ChatAbstractServerMessage";

export default class ChatServerCopyMessage extends ChatAbstractServerMessage {
  public receiverId: number;
  public receiverName: string;

  constructor(channel = 0, content = "", timestamp = 0, fingerprint = "", receiverId = 0, receiverName = "") {
    super(channel, content, timestamp, fingerprint);
    this.receiverId = receiverId;
    this.receiverName = receiverName;

  }
}
