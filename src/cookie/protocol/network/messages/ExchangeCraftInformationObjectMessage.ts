import ExchangeCraftResultWithObjectIdMessage from "./ExchangeCraftResultWithObjectIdMessage";

export default class ExchangeCraftInformationObjectMessage extends ExchangeCraftResultWithObjectIdMessage {
  public playerId: number;

  constructor(craftResult = 0, objectGenericId = 0, playerId = 0) {
    super(craftResult, objectGenericId);
    this.playerId = playerId;

  }
}
