import Message from "./Message";

export default class ExchangeClearPaymentForCraftMessage extends Message {
  public paymentType: number;

  constructor(paymentType = 0) {
    super();
    this.paymentType = paymentType;

  }
}
