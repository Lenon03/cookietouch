import ChatClientPrivateMessage from "@/protocol/network/messages/ChatClientPrivateMessage";
import ObjectItem from "@/protocol/network/types/ObjectItem";

export default class ChatClientPrivateWithObjectMessage extends ChatClientPrivateMessage {
  public objects: ObjectItem[];

  constructor(content = "", receiver = "", objects: ObjectItem[]) {
    super(content, receiver);
    this.objects = objects;

  }
}
