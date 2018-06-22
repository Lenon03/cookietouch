import CompassUpdateMessage from "@/protocol/network/messages/CompassUpdateMessage";
import MapCoordinates from "@/protocol/network/types/MapCoordinates";

export default class CompassUpdatePvpSeekMessage extends CompassUpdateMessage {
  public memberId: number;
  public memberName: string;

  constructor(type = 0, coords: MapCoordinates, memberId = 0, memberName = "") {
    super(type, coords);
    this.memberId = memberId;
    this.memberName = memberName;

  }
}
