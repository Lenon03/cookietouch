import ObjectItem from "@protocol/network/types/ObjectItem";
import ChatServerCopyMessage from "./ChatServerCopyMessage";

export default class ChatServerCopyWithObjectMessage extends ChatServerCopyMessage {
  public objects: ObjectItem[];

  constructor(channel = 0, content = "", timestamp = 0, fingerprint = "",
              receiverId = 0, receiverName = "", objects: ObjectItem[]) {
    super(channel, content, timestamp, fingerprint, receiverId, receiverName);
    this.objects = objects;

  }
}
