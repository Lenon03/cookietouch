import Message from "./Message";

export default class HouseToSellFilterMessage extends Message {
  public areaId: number;
  public atLeastNbRoom: number;
  public atLeastNbChest: number;
  public skillRequested: number;
  public maxPrice: number;

  constructor(areaId = 0, atLeastNbRoom = 0, atLeastNbChest = 0, skillRequested = 0, maxPrice = 0) {
    super();
    this.areaId = areaId;
    this.atLeastNbRoom = atLeastNbRoom;
    this.atLeastNbChest = atLeastNbChest;
    this.skillRequested = skillRequested;
    this.maxPrice = maxPrice;

  }
}
