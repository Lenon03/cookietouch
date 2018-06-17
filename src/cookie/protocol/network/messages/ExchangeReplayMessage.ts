import Message from "./Message";

export default class ExchangeReplayMessage extends Message {
  public count: number;

  constructor(count = 0) {
    super();
    this.count = count;

  }
}
