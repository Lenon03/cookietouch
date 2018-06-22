import Message from "@/protocol/network/messages/Message";

export default class InventoryPresetUseMessage extends Message {
  public presetId: number;

  constructor(presetId = 0) {
    super();
    this.presetId = presetId;

  }
}
