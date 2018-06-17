import Message from "./Message";

export default class InventoryPresetSaveCustomMessage extends Message {
  public itemsPositions: number[];
  public itemsUids: number[];
  public presetId: number;
  public symbolId: number;

  constructor(presetId = 0, symbolId = 0, itemsPositions: number[], itemsUids: number[]) {
    super();
    this.itemsPositions = itemsPositions;
    this.itemsUids = itemsUids;
    this.presetId = presetId;
    this.symbolId = symbolId;

  }
}
