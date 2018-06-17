import ExchangeCraftResultMessage from "./ExchangeCraftResultMessage";

export default class ExchangeCraftResultWithObjectIdMessage extends ExchangeCraftResultMessage {
  public objectGenericId: number;

  constructor(craftResult = 0, objectGenericId = 0) {
    super(craftResult);
    this.objectGenericId = objectGenericId;

  }
}
