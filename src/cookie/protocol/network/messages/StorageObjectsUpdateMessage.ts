import Message from "@/protocol/network/messages/Message";
import ObjectItem from "@/protocol/network/types/ObjectItem";

export default class StorageObjectsUpdateMessage extends Message {
  public objectList: ObjectItem[];

  constructor(objectList: ObjectItem[]) {
    super();
    this.objectList = objectList;

  }
}
