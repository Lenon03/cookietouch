import Message from "./Message";

export default class PrismFightSwapRequestMessage extends Message {
  public subAreaId: number;
  public targetId: number;

  constructor(subAreaId = 0, targetId = 0) {
    super();
    this.subAreaId = subAreaId;
    this.targetId = targetId;

  }
}
