import MapCoordinates from "./MapCoordinates";

export default class MapCoordinatesAndId extends MapCoordinates {
  public mapId: number;

  constructor(worldX = 0, worldY = 0, mapId = 0) {
    super(worldX, worldY);
    this.mapId = mapId;

  }
}
