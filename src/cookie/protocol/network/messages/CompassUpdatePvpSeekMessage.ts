import MapCoordinates from "@protocol/network/types/MapCoordinates";
import CompassUpdateMessage from "./CompassUpdateMessage";
export default class CompassUpdatePvpSeekMessage extends CompassUpdateMessage {
public memberId: number;
public memberName: string;
constructor(type = 0, coords: MapCoordinates, memberId = 0, memberName = "") {
super(type, coords );
this.memberId = memberId;
this.memberName = memberName;

}
}
