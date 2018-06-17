import Message from "./Message";

export default class PrismSettingsRequestMessage extends Message {
  public subAreaId: number;
  public startDefenseTime: number;

  constructor(subAreaId = 0, startDefenseTime = 0) {
    super();
    this.subAreaId = subAreaId;
    this.startDefenseTime = startDefenseTime;

  }
}
