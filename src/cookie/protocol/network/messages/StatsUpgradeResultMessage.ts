import Message from "@/protocol/network/messages/Message";

export default class StatsUpgradeResultMessage extends Message {
  public nbCharacBoost: number;

  constructor(nbCharacBoost = 0) {
    super();
    this.nbCharacBoost = nbCharacBoost;

  }
}
