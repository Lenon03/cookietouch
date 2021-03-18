import ExchangeRequestMessage from "@/protocol/network/messages/ExchangeRequestMessage";

export default class ExchangePlayerRequestMessage extends ExchangeRequestMessage {
  public target: number;

  constructor(exchangeType = 0, target = 0) {
    super(exchangeType);
    this.target = target;

  }
}
