import ObjectItem from "@protocol/network/types/ObjectItem";
import Message from "./Message";

export default class StorageObjectUpdateMessage extends Message {
  public object: ObjectItem;
  constructor(object: ObjectItem) {
    super();
    this.object = object;

  }
}
