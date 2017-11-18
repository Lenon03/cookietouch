import ObjectEffect from "@protocol/network/types/ObjectEffect";
import ExchangeBidHouseInListAddedMessage from "./ExchangeBidHouseInListAddedMessage";
export default class ExchangeBidHouseInListUpdatedMessage extends ExchangeBidHouseInListAddedMessage {
  constructor(itemUID = 0, objGenericId = 0, effects: ObjectEffect[], prices: number[]) {
    super(itemUID, objGenericId, effects, prices);

  }
}
