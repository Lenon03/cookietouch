import Message from "@/protocol/network/messages/Message";
import UpdateMountBoost from "@/protocol/network/types/UpdateMountBoost";

export default class UpdateMountBoostMessage extends Message {
  public boostToUpdateList: UpdateMountBoost[];
  public rideId: number;

  constructor(rideId = 0, boostToUpdateList: UpdateMountBoost[]) {
    super();
    this.boostToUpdateList = boostToUpdateList;
    this.rideId = rideId;

  }
}
