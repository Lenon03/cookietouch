import Message from "./Message";

export default class ExchangeStartedMessage extends Message {
  public exchangeType: number;

  constructor(exchangeType = 0) {
    super();
    this.exchangeType = exchangeType;

  }
}
