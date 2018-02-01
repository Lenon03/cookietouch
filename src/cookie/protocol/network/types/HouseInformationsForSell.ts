import Type from "./Type";

export default class HouseInformationsForSell extends Type {
  public skillListIds: number[];
  public modelId: number;
  public ownerName: string;
  public ownerConnected: boolean;
  public worldX: number;
  public worldY: number;
  public subAreaId: number;
  public nbRoom: number;
  public nbChest: number;
  public isLocked: boolean;
  public price: number;

  constructor(modelId = 0, ownerName = "", ownerConnected = false, worldX = 0,
              worldY = 0, subAreaId = 0, nbRoom = 0, nbChest = 0, isLocked = false,
              price = 0, skillListIds: number[] = null) {
    super();
    this.skillListIds = skillListIds;
    this.modelId = modelId;
    this.ownerName = ownerName;
    this.ownerConnected = ownerConnected;
    this.worldX = worldX;
    this.worldY = worldY;
    this.subAreaId = subAreaId;
    this.nbRoom = nbRoom;
    this.nbChest = nbChest;
    this.isLocked = isLocked;
    this.price = price;
  }
}
