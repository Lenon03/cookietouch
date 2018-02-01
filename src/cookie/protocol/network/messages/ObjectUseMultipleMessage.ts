import ObjectUseMessage from "./ObjectUseMessage";

export default class ObjectUseMultipleMessage extends ObjectUseMessage {
  public quantity: number;

  constructor(objectUID = 0, quantity = 0) {
    super(objectUID);
    this.quantity = quantity;

  }
}
