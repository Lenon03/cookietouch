import Message from "@/protocol/network/messages/Message";
import PresetItem from "@/protocol/network/types/PresetItem";

export default class InventoryPresetItemUpdateMessage extends Message {
  public presetId: number;
  public presetItem: PresetItem;

  constructor(presetId = 0, presetItem: PresetItem) {
    super();
    this.presetId = presetId;
    this.presetItem = presetItem;

  }
}
