import Message from "./Message";

export default class ShortcutBarSwapRequestMessage extends Message {
  public barType: number;
  public firstSlot: number;
  public secondSlot: number;

  constructor(barType = 0, firstSlot = 0, secondSlot = 0) {
    super();
    this.barType = barType;
    this.firstSlot = firstSlot;
    this.secondSlot = secondSlot;

  }
}
