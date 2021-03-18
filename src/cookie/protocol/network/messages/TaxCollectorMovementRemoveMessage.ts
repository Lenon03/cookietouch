import Message from "@/protocol/network/messages/Message";

export default class TaxCollectorMovementRemoveMessage extends Message {
  public collectorId: number;

  constructor(collectorId = 0) {
    super();
    this.collectorId = collectorId;

  }
}
