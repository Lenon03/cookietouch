import Message from "./Message";

export default class ExchangeReadyMessage extends Message {
  public ready: boolean;
  public step: number;

  constructor(ready = false, step = 0) {
    super();
    this.ready = ready;
    this.step = step;

  }
}
