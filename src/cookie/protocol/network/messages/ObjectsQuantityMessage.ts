import Message from "@/protocol/network/messages/Message";
import ObjectItemQuantity from "@/protocol/network/types/ObjectItemQuantity";

export default class ObjectsQuantityMessage extends Message {
  public objectsUIDAndQty: ObjectItemQuantity[];

  constructor(objectsUIDAndQty: ObjectItemQuantity[]) {
    super();
    this.objectsUIDAndQty = objectsUIDAndQty;

  }
}
