import MapCoordinates from "@protocol/network/types/MapCoordinates";
import CompassUpdateMessage from "./CompassUpdateMessage";

export default class CompassUpdatePartyMemberMessage extends CompassUpdateMessage {
  public memberId: number;

  constructor(type = 0, coords: MapCoordinates, memberId = 0) {
    super(type, coords);
    this.memberId = memberId;

  }
}
