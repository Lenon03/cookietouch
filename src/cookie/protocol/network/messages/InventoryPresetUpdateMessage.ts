import Preset from "@/protocol/network/types/Preset";
import Message from "@/protocol/network/messages/Message";

export default class InventoryPresetUpdateMessage extends Message {
  public preset: Preset;

  constructor(preset: Preset) {
    super();
    this.preset = preset;

  }
}
