import Message from "./Message";

export default class ObjectsDeletedMessage extends Message {
  public objectUID: number[];

  constructor(objectUID: number[]) {
    super();
    this.objectUID = objectUID;

  }
}
