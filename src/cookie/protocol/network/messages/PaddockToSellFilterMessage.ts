import Message from "@/protocol/network/messages/Message";

export default class PaddockToSellFilterMessage extends Message {
  public areaId: number;
  public atLeastNbMount: number;
  public atLeastNbMachine: number;
  public maxPrice: number;

  constructor(areaId = 0, atLeastNbMount = 0, atLeastNbMachine = 0, maxPrice = 0) {
    super();
    this.areaId = areaId;
    this.atLeastNbMount = atLeastNbMount;
    this.atLeastNbMachine = atLeastNbMachine;
    this.maxPrice = maxPrice;

  }
}
