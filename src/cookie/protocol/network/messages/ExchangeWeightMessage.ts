import Message from "@/protocol/network/messages/Message";

export default class ExchangeWeightMessage extends Message {
  public currentWeight: number;
  public maxWeight: number;

  constructor(currentWeight = 0, maxWeight = 0) {
    super();
    this.currentWeight = currentWeight;
    this.maxWeight = maxWeight;

  }
}
