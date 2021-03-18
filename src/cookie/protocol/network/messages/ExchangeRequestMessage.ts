import Message from "@/protocol/network/messages/Message";

export default class ExchangeRequestMessage extends Message {
  public exchangeType: number;

  constructor(exchangeType = 0) {
    super();
    this.exchangeType = exchangeType;

  }
}
