import Message from "./Message";

export default class PrismFightAttackedMessage extends Message {
  public worldX: number;
  public worldY: number;
  public mapId: number;
  public subAreaId: number;
  public prismSide: number;

  constructor(worldX = 0, worldY = 0, mapId = 0, subAreaId = 0, prismSide = 0) {
    super();
    this.worldX = worldX;
    this.worldY = worldY;
    this.mapId = mapId;
    this.subAreaId = subAreaId;
    this.prismSide = prismSide;

  }
}
