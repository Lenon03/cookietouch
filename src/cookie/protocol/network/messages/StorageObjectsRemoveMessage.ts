import Message from "./Message";

export default class StorageObjectsRemoveMessage extends Message {
  public objectUIDList: number[];

  constructor(objectUIDList: number[]) {
    super();
    this.objectUIDList = objectUIDList;

  }
}
