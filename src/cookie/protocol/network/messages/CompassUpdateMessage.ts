import MapCoordinates from "@protocol/network/types/MapCoordinates";
import Message from "./Message";

export default class CompassUpdateMessage extends Message {
  public type: number;
  public coords: MapCoordinates;

  constructor(type = 0, coords: MapCoordinates) {
    super();
    this.type = type;
    this.coords = coords;

  }
}
