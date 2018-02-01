import ObjectItem from "@protocol/network/types/ObjectItem";
import ChatServerMessage from "./ChatServerMessage";

export default class ChatServerWithObjectMessage extends ChatServerMessage {
  public objects: ObjectItem[];

  constructor(channel = 0, content = "", timestamp = 0, fingerprint = "",
              senderId = 0, senderName = "", senderAccountId = 0, objects: ObjectItem[]) {
    super(channel, content, timestamp, fingerprint, senderId, senderName, senderAccountId);
    this.objects = objects;

  }
}
