import ObjectItem from "@protocol/network/types/ObjectItem";
import Message from "./Message";
export default class ObjectsAddedMessage extends Message {
  public object: ObjectItem[];
  constructor(object: ObjectItem[]) {
    super();
    this.object = object;
  }
}
