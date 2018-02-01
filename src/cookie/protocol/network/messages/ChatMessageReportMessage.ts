import Message from "./Message";

export default class ChatMessageReportMessage extends Message {
  public senderName: string;
  public content: string;
  public timestamp: number;
  public channel: number;
  public fingerprint: string;
  public reason: number;

  constructor(senderName = "", content = "", timestamp = 0, channel = 0, fingerprint = "", reason = 0) {
    super();
    this.senderName = senderName;
    this.content = content;
    this.timestamp = timestamp;
    this.channel = channel;
    this.fingerprint = fingerprint;
    this.reason = reason;

  }
}
