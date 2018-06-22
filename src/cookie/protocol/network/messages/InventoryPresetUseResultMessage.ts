import Message from "@/protocol/network/messages/Message";

export default class InventoryPresetUseResultMessage extends Message {
  public unlinkedPosition: number[];
  public presetId: number;
  public code: number;

  constructor(presetId = 0, code = 3, unlinkedPosition: number[]) {
    super();
    this.unlinkedPosition = unlinkedPosition;
    this.presetId = presetId;
    this.code = code;

  }
}
