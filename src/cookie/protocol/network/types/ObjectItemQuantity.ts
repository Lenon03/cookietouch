import Item from "@/protocol/network/types/Item";

export default class ObjectItemQuantity extends Item {
  public objectUID: number;
  public quantity: number;

  constructor(objectUid = 0, quantity = 0) {
    super();
    this.objectUID = objectUid;
    this.quantity = quantity;
  }
}
