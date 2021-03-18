import Message from "@/protocol/network/messages/Message";

export default class PaddockSellRequestMessage extends Message {
  public price: number;

  constructor(price = 0) {
    super();
    this.price = price;

  }
}
