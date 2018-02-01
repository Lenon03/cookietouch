import Message from "./Message";

export default class PrismSetSabotagedRefusedMessage extends Message {
  public subAreaId: number;
  public reason: number;

  constructor(subAreaId = 0, reason = 0) {
    super();
    this.subAreaId = subAreaId;
    this.reason = reason;

  }
}
