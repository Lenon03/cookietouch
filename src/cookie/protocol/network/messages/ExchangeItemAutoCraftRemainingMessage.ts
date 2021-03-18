import Message from "@/protocol/network/messages/Message";

export default class ExchangeItemAutoCraftRemainingMessage extends Message {
  public count: number;

  constructor(count = 0) {
    super();
    this.count = count;

  }
}
