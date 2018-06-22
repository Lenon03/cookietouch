import Message from "@/protocol/network/messages/Message";

export default class ExchangeBidHousePriceMessage extends Message {
  public genId: number;

  constructor(genId = 0) {
    super();
    this.genId = genId;

  }
}
