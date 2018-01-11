import MapCoordinatesExtended from "./MapCoordinatesExtended";
import Type from "./Type";

export default class AtlasPointsInformations extends Type {

  public coords: MapCoordinatesExtended[];
  public type: number;

  constructor(type = 0, coords: MapCoordinatesExtended[]) {
    super();
    this.coords = coords;
    this.type = type;
  }
}
