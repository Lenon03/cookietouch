import Message from "./Message";

export default class InventoryPresetSaveMessage extends Message {
  public presetId: number;
  public symbolId: number;
  public saveEquipment: boolean;

  constructor(presetId = 0, symbolId = 0, saveEquipment = false) {
    super();
    this.presetId = presetId;
    this.symbolId = symbolId;
    this.saveEquipment = saveEquipment;

  }
}
