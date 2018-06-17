import Type from "./Type";

export default class MapCoordinates extends Type {
  public worldX: number;
  public worldY: number;

  constructor(worldX = 0, worldY = 0) {
    super();
    this.worldX = worldX;
    this.worldY = worldY;
  }
}
