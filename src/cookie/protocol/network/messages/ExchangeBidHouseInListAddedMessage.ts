import Message from "@/protocol/network/messages/Message";
import ObjectEffect from "@/protocol/network/types/ObjectEffect";

export default class ExchangeBidHouseInListAddedMessage extends Message {
  public effects: ObjectEffect[];
  public prices: number[];
  public itemUID: number;
  public objGenericId: number;

  constructor(itemUID = 0, objGenericId = 0, effects: ObjectEffect[], prices: number[]) {
    super();
    this.effects = effects;
    this.prices = prices;
    this.itemUID = itemUID;
    this.objGenericId = objGenericId;

  }
}
