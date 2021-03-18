import Message from "@/protocol/network/messages/Message";

export default class ChatAbstractServerMessage extends Message {
  public channel: number;
  public content: string;
  public timestamp: number;
  public fingerprint: string;

  constructor(channel = 0, content = "", timestamp = 0, fingerprint = "") {
    super();
    this.channel = channel;
    this.content = content;
    this.timestamp = timestamp;
    this.fingerprint = fingerprint;

  }
}
