import Message from "./Message";
export default class InventoryPresetDeleteMessage extends Message {
public presetId: number;
constructor(presetId = 0) {
super();
this.presetId = presetId;

}
}
