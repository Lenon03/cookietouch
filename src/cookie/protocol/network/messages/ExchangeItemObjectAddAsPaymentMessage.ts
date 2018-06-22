import Message from "@/protocol/network/messages/Message";

export default class ExchangeItemObjectAddAsPaymentMessage extends Message {
  public paymentType: number;
  public bAdd: boolean;
  public objectToMoveId: number;
  public quantity: number;

  constructor(paymentType = 0, bAdd = false, objectToMoveId = 0, quantity = 0) {
    super();
    this.paymentType = paymentType;
    this.bAdd = bAdd;
    this.objectToMoveId = objectToMoveId;
    this.quantity = quantity;

  }
}
