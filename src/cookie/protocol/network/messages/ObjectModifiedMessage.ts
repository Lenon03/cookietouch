import ObjectItem from "@protocol/network/types/ObjectItem";
import Message from "./Message";

export default class ObjectModifiedMessage extends Message {
  public objectItem: ObjectItem;

  constructor(object: ObjectItem) {
    super();
    this.objectItem = object;

  }
}
