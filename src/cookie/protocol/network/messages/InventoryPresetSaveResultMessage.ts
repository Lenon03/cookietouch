import Message from "./Message";

export default class InventoryPresetSaveResultMessage extends Message {
  public presetId: number;
  public code: number;

  constructor(presetId = 0, code = 2) {
    super();
    this.presetId = presetId;
    this.code = code;

  }
}
