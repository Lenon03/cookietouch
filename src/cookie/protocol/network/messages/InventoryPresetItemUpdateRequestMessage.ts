import Message from "./Message";

export default class InventoryPresetItemUpdateRequestMessage extends Message {
  public presetId: number;
  public position: number;
  public objUid: number;

  constructor(presetId = 0, position = 63, objUid = 0) {
    super();
    this.presetId = presetId;
    this.position = position;
    this.objUid = objUid;

  }
}
