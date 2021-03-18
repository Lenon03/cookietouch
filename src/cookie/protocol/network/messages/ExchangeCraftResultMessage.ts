import Message from "@/protocol/network/messages/Message";

export default class ExchangeCraftResultMessage extends Message {
  public craftResult: number;

  constructor(craftResult = 0) {
    super();
    this.craftResult = craftResult;

  }
}
