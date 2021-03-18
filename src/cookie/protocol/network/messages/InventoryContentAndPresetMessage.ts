import InventoryContentMessage from "@/protocol/network/messages/InventoryContentMessage";
import ObjectItem from "@/protocol/network/types/ObjectItem";
import Preset from "@/protocol/network/types/Preset";

export default class InventoryContentAndPresetMessage extends InventoryContentMessage {
  public presets: Preset[];

  constructor(kamas = 0, objects: ObjectItem[], presets: Preset[]) {
    super(kamas, objects);
    this.presets = presets;

  }
}
