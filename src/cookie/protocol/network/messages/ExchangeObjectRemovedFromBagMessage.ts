import ExchangeObjectMessage from "./ExchangeObjectMessage";

export default class ExchangeObjectRemovedFromBagMessage extends ExchangeObjectMessage {
  public objectUID: number;

  constructor(remote = false, objectUID = 0) {
    super(remote);
    this.objectUID = objectUID;

  }
}
