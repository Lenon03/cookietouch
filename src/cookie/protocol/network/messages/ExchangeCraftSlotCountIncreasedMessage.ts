import Message from "@/protocol/network/messages/Message";

export default class ExchangeCraftSlotCountIncreasedMessage extends Message {
  public newMaxSlot: number;

  constructor(newMaxSlot = 0) {
    super();
    this.newMaxSlot = newMaxSlot;

  }
}
