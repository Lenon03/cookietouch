import Message from "@/protocol/network/messages/Message";

export default class ExchangeStartedMessage extends Message {
  public exchangeType: number;

  constructor(exchangeType = 0) {
    super();
    this.exchangeType = exchangeType;

  }
}
