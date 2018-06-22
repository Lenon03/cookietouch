import Message from "@/protocol/network/messages/Message";

export default class LifePointsRegenBeginMessage extends Message {

  public regenRate: number;

  constructor(regenRate = 0) {
    super();
    this.regenRate = regenRate;
  }
}
