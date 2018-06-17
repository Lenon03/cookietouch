import Message from "./Message";

export default class ObjectDropMessage extends Message {
  public objectUID: number;
  public quantity: number;

  constructor(objectUID = 0, quantity = 0) {
    super();
    this.objectUID = objectUID;
    this.quantity = quantity;

  }
}
