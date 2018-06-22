import Message from "@/protocol/network/messages/Message";

export default class ExchangeObjectTransfertListWithQuantityToInvMessage extends Message {
  public ids: number[];
  public qtys: number[];

  constructor(ids: number[], qtys: number[]) {
    super();
    this.ids = ids;
    this.qtys = qtys;

  }
}
