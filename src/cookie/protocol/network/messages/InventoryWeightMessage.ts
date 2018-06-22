import Message from "@/protocol/network/messages/Message";

export default class InventoryWeightMessage extends Message {

  public weight: number;
  public weightMax: number;

  constructor(weight = 0, weightMax = 0) {
    super();
    this.weight = weight;
    this.weightMax = weightMax;
  }
}
