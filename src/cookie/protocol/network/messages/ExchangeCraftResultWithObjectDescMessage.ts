import ObjectItemNotInContainer from "@/protocol/network/types/ObjectItemNotInContainer";
import ExchangeCraftResultMessage from "@/protocol/network/messages/ExchangeCraftResultMessage";

export default class ExchangeCraftResultWithObjectDescMessage extends ExchangeCraftResultMessage {
  public objectInfo: ObjectItemNotInContainer;

  constructor(craftResult = 0, objectInfo: ObjectItemNotInContainer) {
    super(craftResult);
    this.objectInfo = objectInfo;

  }
}
