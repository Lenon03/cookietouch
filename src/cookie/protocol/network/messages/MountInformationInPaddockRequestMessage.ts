import Message from "@/protocol/network/messages/Message";

export default class MountInformationInPaddockRequestMessage extends Message {
  public mapRideId: number;

  constructor(mapRideId = 0) {
    super();
    this.mapRideId = mapRideId;

  }
}
