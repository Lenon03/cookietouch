import Message from "@/protocol/network/messages/Message";

export default class ExchangeObjectMessage extends Message {
  public remote: boolean;

  constructor(remote = false) {
    super();
    this.remote = remote;

  }
}
