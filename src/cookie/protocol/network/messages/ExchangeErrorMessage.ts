import Message from "@/protocol/network/messages/Message";

export default class ExchangeErrorMessage extends Message {
  public errorType: number;

  constructor(errorType = 0) {
    super();
    this.errorType = errorType;

  }
}
