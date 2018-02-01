import ObjectItemNotInContainer from "@protocol/network/types/ObjectItemNotInContainer";
import Message from "./Message";

export default class ExchangeModifiedPaymentForCraftMessage extends Message {
  public onlySuccess: boolean;
  public objectPublic: ObjectItemNotInContainer;

  constructor(onlySuccess = false, object: ObjectItemNotInContainer) {
    super();
    this.onlySuccess = onlySuccess;
    this.objectPublic = object;

  }
}
