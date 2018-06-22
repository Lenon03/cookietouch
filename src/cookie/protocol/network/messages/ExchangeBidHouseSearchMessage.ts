import Message from "@/protocol/network/messages/Message";

export default class ExchangeBidHouseSearchMessage extends Message {
  public type: number;
  public genId: number;

  constructor(type = 0, genId = 0) {
    super();
    this.type = type;
    this.genId = genId;

  }
}
