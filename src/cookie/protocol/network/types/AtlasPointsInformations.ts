import MapCoordinatesExtended from "./MapCoordinatesExtended";

export default class AtlasPointsInformations {

  public coords: MapCoordinatesExtended[];
  public type: number;

  constructor(type = 0, coords: MapCoordinatesExtended[]) {
    this.coords = coords;
    this.type = type;
  }
}
