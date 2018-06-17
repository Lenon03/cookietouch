import ExchangeRequestedMessage from "./ExchangeRequestedMessage";

export default class ExchangeRequestedTradeMessage extends ExchangeRequestedMessage {
  public source: number;
  public target: number;

  constructor(exchangeType = 0, source = 0, target = 0) {
    super(exchangeType);
    this.source = source;
    this.target = target;

  }
}
