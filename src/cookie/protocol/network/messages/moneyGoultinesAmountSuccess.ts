import Message from "@/protocol/network/messages/Message";

export default class MoneyGoultinesAmountSuccess extends Message {
  public goultinesAmount: number;

  constructor(goultinesAmount = 0) {
    super();
    this.goultinesAmount = goultinesAmount;
  }
}
