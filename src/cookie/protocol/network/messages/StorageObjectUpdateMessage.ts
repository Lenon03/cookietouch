import Message from "@/protocol/network/messages/Message";
import ObjectItem from "@/protocol/network/types/ObjectItem";

export default class StorageObjectUpdateMessage extends Message {
  public object: ObjectItem;

  constructor(object: ObjectItem) {
    super();
    this.object = object;

  }
}
