import MapCoordinatesAndId from "./MapCoordinatesAndId";

export default class MapCoordinatesExtended extends MapCoordinatesAndId {
  public subAreaId: number;

  constructor(worldX = 0, worldY = 0, mapId = 0, subAreaId = 0) {
    super(worldX, worldY, mapId);
    this.subAreaId = subAreaId;

  }
}
