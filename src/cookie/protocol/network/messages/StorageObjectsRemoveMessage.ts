import Message from "@/protocol/network/messages/Message";

export default class StorageObjectsRemoveMessage extends Message {
  public objectUIDList: number[];

  constructor(objectUIDList: number[]) {
    super();
    this.objectUIDList = objectUIDList;

  }
}
