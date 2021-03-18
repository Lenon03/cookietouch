import Message from "@/protocol/network/messages/Message";

export default class ExchangeClearPaymentForCraftMessage extends Message {
  public paymentType: number;

  constructor(paymentType = 0) {
    super();
    this.paymentType = paymentType;

  }
}
