import ObjectItemQuantity from "@/protocol/network/types/ObjectItemQuantity";
import Message from "@/protocol/network/messages/Message";

export default class ObjectsQuantityMessage extends Message {
  public objectsUIDAndQty: ObjectItemQuantity[];

  constructor(objectsUIDAndQty: ObjectItemQuantity[]) {
    super();
    this.objectsUIDAndQty = objectsUIDAndQty;

  }
}
