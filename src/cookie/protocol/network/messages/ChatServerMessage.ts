import ChatAbstractServerMessage from "./ChatAbstractServerMessage";
export default class ChatServerMessage extends ChatAbstractServerMessage {
  public senderId: number;
  public senderName: string;
  public senderAccountId: number;
  constructor(channel = 0, content = "", timestamp = 0, fingerprint = "",
              senderId = 0, senderName = "", senderAccountId = 0) {
    super(channel, content, timestamp, fingerprint);
    this.senderId = senderId;
    this.senderName = senderName;
    this.senderAccountId = senderAccountId;

  }
}
