import Type from "@/protocol/network/types/Type";

export default class HouseInformationsInside extends Type {
  public houseId: number;
  public modelId: number;
  public ownerId: number;
  public ownerName: string;
  public worldX: number;
  public worldY: number;
  public price: number;
  public isLocked: boolean;

  constructor(houseId = 0, modelId = 0, ownerId = 0, ownerName = "",
              worldX = 0, worldY = 0, price = 0, isLocked = false) {
    super();
    this.houseId = houseId;
    this.modelId = modelId;
    this.ownerId = ownerId;
    this.ownerName = ownerName;
    this.worldX = worldX;
    this.worldY = worldY;
    this.price = price;
    this.isLocked = isLocked;
  }
}
