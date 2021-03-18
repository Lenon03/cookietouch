import ExchangeObjectMessage from "@/protocol/network/messages/ExchangeObjectMessage";

export default class ExchangeObjectRemovedMessage extends ExchangeObjectMessage {
  public objectUID: number;

  constructor(remote = false, objectUID = 0) {
    super(remote);
    this.objectUID = objectUID;

  }
}
