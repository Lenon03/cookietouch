import Message from "./Message";

export default class ExchangeSetCraftRecipeMessage extends Message {
  public objectGID: number;

  constructor(objectGID = 0) {
    super();
    this.objectGID = objectGID;

  }
}
