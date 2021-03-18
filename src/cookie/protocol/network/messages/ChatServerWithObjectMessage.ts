import ChatServerMessage from "@/protocol/network/messages/ChatServerMessage";
import ObjectItem from "@/protocol/network/types/ObjectItem";

export default class ChatServerWithObjectMessage extends ChatServerMessage {
  public objects: ObjectItem[];

  constructor(channel = 0, content = "", timestamp = 0, fingerprint = "",
              senderId = 0, senderName = "", senderAccountId = 0, objects: ObjectItem[]) {
    super(channel, content, timestamp, fingerprint, senderId, senderName, senderAccountId);
    this.objects = objects;

  }
}
