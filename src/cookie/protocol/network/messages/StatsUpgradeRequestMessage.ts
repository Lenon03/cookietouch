import Message from "./Message";

export default class StatsUpgradeRequestMessage extends Message {
  public statId: number;
  public boostPoint: number;

  constructor(statId = 11, boostPoint = 0) {
    super();
    this.statId = statId;
    this.boostPoint = boostPoint;

  }
}
