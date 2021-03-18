import Message from "@/protocol/network/messages/Message";

export default class ExchangeBidHouseTypeMessage extends Message {
  public type: number;

  constructor(type = 0) {
    super();
    this.type = type;

  }
}
