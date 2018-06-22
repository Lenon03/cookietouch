import ExchangeObjectMessage from "@/protocol/network/messages/ExchangeObjectMessage";
import ObjectItem from "@/protocol/network/types/ObjectItem";

export default class ExchangeObjectModifiedInBagMessage extends ExchangeObjectMessage {
  public objectPublic: ObjectItem;

  constructor(remote = false, object: ObjectItem) {
    super(remote);
    this.objectPublic = object;

  }
}
