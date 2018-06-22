import ObjectItem from "@/protocol/network/types/ObjectItem";
import ChatClientMultiMessage from "@/protocol/network/messages/ChatClientMultiMessage";

export default class ChatClientMultiWithObjectMessage extends ChatClientMultiMessage {
  public objects: ObjectItem[];

  constructor(content = "", channel = 0, objects: ObjectItem[]) {
    super(content, channel);
    this.objects = objects;

  }
}
