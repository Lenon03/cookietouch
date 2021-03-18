import Message from "@/protocol/network/messages/Message";

export default class ObjectsDeletedMessage extends Message {
  public objectUID: number[];

  constructor(objectUID: number[]) {
    super();
    this.objectUID = objectUID;

  }
}
