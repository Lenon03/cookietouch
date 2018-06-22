import Message from "@/protocol/network/messages/Message";

export default class ExchangeObjectTransfertListToInvMessage extends Message {
  public ids: number[];

  constructor(ids: number[]) {
    super();
    this.ids = ids;

  }
}
