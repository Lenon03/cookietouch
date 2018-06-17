import Message from "./Message";

export default class ExchangeBidHouseTypeMessage extends Message {
  public type: number;

  constructor(type = 0) {
    super();
    this.type = type;

  }
}
