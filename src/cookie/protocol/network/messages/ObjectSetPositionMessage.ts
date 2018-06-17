import Message from "./Message";

export default class ObjectSetPositionMessage extends Message {
  public objectUID: number;
  public position: number;
  public quantity: number;

  constructor(objectUID = 0, position = 63, quantity = 0) {
    super();
    this.objectUID = objectUID;
    this.position = position;
    this.quantity = quantity;

  }
}
