import ExchangeCraftResultWithObjectDescMessage from "@/protocol/network/messages/ExchangeCraftResultWithObjectDescMessage";
import ObjectItemNotInContainer from "@/protocol/network/types/ObjectItemNotInContainer";

export default class ExchangeCraftResultMagicWithObjectDescMessage extends ExchangeCraftResultWithObjectDescMessage {
  public magicPoolStatus: number;

  constructor(craftResult = 0, objectInfo: ObjectItemNotInContainer, magicPoolStatus = 0) {
    super(craftResult, objectInfo);
    this.magicPoolStatus = magicPoolStatus;

  }
}
