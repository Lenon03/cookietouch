import ExchangeStartedMessage from "@/protocol/network/messages/ExchangeStartedMessage";

export default class ExchangeStartedWithStorageMessage extends ExchangeStartedMessage {
  public storageMaxSlot: number;

  constructor(exchangeType = 0, storageMaxSlot = 0) {
    super(exchangeType);
    this.storageMaxSlot = storageMaxSlot;

  }
}
