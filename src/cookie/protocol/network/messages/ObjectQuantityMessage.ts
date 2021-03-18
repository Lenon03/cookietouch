import Message from "@/protocol/network/messages/Message";

export default class ObjectQuantityMessage extends Message {
  public objectUID: number;
  public quantity: number;

  constructor(objectUID = 0, quantity = 0) {
    super();
    this.objectUID = objectUID;
    this.quantity = quantity;

  }
}
