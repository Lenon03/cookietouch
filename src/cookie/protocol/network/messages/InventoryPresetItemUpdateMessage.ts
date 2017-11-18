import PresetItem from "@protocol/network/types/PresetItem";
import Message from "./Message";
export default class InventoryPresetItemUpdateMessage extends Message {
public presetId: number;
public presetItem: PresetItem;
constructor(presetId = 0, presetItem: PresetItem) {
super();
this.presetId = presetId;
this.presetItem = presetItem;

}
}
