import ExchangeObjectMessage from "@/protocol/network/messages/ExchangeObjectMessage";
import ObjectItem from "@/protocol/network/types/ObjectItem";

export default class ExchangeObjectModifiedMessage extends ExchangeObjectMessage {
  public object: ObjectItem;

  constructor(remote = false, object: ObjectItem) {
    super(remote);
    this.object = object;
  }
}
