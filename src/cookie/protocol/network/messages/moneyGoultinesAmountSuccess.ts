import Message from "@/protocol/network/messages/Message";

export default class MoneyGoultinesAmountSuccess extends Message {
  public goultinesAmount: number;

  constructor() {
    super();

  }
}
