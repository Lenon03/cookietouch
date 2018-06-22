import Message from "@/protocol/network/messages/Message";
import Preset from "@/protocol/network/types/Preset";

export default class InventoryPresetUpdateMessage extends Message {
  public preset: Preset;

  constructor(preset: Preset) {
    super();
    this.preset = preset;

  }
}
