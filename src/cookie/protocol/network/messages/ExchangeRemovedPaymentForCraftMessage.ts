import Message from "./Message";

export default class ExchangeRemovedPaymentForCraftMessage extends Message {
  public onlySuccess: boolean;
  public objectUID: number;

  constructor(onlySuccess = false, objectUID = 0) {
    super();
    this.onlySuccess = onlySuccess;
    this.objectUID = objectUID;

  }
}
