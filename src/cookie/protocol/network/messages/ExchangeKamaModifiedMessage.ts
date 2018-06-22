import ExchangeObjectMessage from "@/protocol/network/messages/ExchangeObjectMessage";

export default class ExchangeKamaModifiedMessage extends ExchangeObjectMessage {
  public quantity: number;

  constructor(remote = false, quantity = 0) {
    super(remote);
    this.quantity = quantity;

  }
}
