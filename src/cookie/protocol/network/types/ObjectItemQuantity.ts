import Item from "./Item";

export default class ObjectItemQuantity extends Item {

  public objectUid: number;
  public quantity: number;

  constructor(objectUid = 0, quantity = 0) {
    super();
    this.objectUid = objectUid;
    this.quantity = quantity;
  }
}
