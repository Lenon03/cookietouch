import Message from "@/protocol/network/messages/Message";

export default class ExchangeItemGoldAddAsPaymentMessage extends Message {
  public paymentType: number;
  public quantity: number;

  constructor(paymentType = 0, quantity = 0) {
    super();
    this.paymentType = paymentType;
    this.quantity = quantity;

  }
}
