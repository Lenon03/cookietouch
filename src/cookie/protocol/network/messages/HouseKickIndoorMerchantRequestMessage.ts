import Message from "./Message";

export default class HouseKickIndoorMerchantRequestMessage extends Message {
  public cellId: number;

  constructor(cellId = 0) {
    super();
    this.cellId = cellId;

  }
}
