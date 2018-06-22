import ExchangeBidHouseInListAddedMessage from "@/protocol/network/messages/ExchangeBidHouseInListAddedMessage";
import ObjectEffect from "@/protocol/network/types/ObjectEffect";

export default class ExchangeBidHouseInListUpdatedMessage extends ExchangeBidHouseInListAddedMessage {
  constructor(itemUID = 0, objGenericId = 0, effects: ObjectEffect[], prices: number[]) {
    super(itemUID, objGenericId, effects, prices);

  }
}
