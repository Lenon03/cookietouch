export default class AccountHouseInformations {

  public houseId: number;
  public modelId: number;
  public worldX: number;
  public worldY: number;
  public mapId: number;
  public subareaId: number;

  constructor(houseId = 0, modelId = 0, worldX = 0, worldY = 0, mapId = 0, subareaId = 0) {
    this.houseId = houseId;
    this.modelId = modelId;
    this.worldX = worldX;
    this.worldY = worldY;
    this.mapId = mapId;
    this.subareaId = subareaId;
  }
}
