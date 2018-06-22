import Message from "@/protocol/network/messages/Message";

export default class ExchangeIsReadyMessage extends Message {
  public id: number;
  public ready: boolean;

  constructor(id = 0, ready = false) {
    super();
    this.id = id;
    this.ready = ready;

  }
}
