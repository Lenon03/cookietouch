import MapCoordinatesExtended from "@/protocol/network/types/MapCoordinatesExtended";
import Type from "@/protocol/network/types/Type";

export default class AtlasPointsInformations extends Type {

  public coords: MapCoordinatesExtended[];
  public type: number;

  constructor(type = 0, coords: MapCoordinatesExtended[]) {
    super();
    this.coords = coords;
    this.type = type;
  }
}
