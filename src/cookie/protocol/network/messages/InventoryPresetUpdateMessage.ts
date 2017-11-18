import Preset from "@protocol/network/types/Preset";
import Message from "./Message";
export default class InventoryPresetUpdateMessage extends Message {
public preset: Preset;
constructor(preset: Preset) {
super();
this.preset = preset;

}
}
