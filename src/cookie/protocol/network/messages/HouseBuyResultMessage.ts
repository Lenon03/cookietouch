import Message from "@/protocol/network/messages/Message";

export default class HouseBuyResultMessage extends Message {
  public houseId: number;
  public bought: boolean;
  public realPrice: number;

  constructor(houseId = 0, bought = false, realPrice = 0) {
    super();
    this.houseId = houseId;
    this.bought = bought;
    this.realPrice = realPrice;

  }
}
