import Message from "@/protocol/network/messages/Message";

export default class InventoryPresetDeleteMessage extends Message {
  public presetId: number;

  constructor(presetId = 0) {
    super();
    this.presetId = presetId;

  }
}
