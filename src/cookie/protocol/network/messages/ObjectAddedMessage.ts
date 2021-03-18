import Message from "@/protocol/network/messages/Message";
import ObjectItem from "@/protocol/network/types/ObjectItem";

export default class ObjectAddedMessage extends Message {
  public object: ObjectItem;

  constructor(object: ObjectItem) {
    super();
    this.object = object;
  }
}
