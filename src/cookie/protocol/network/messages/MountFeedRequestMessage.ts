import Message from "@/protocol/network/messages/Message";

export default class MountFeedRequestMessage extends Message {
  public mountUid: number;
  public mountLocation: number;
  public mountFoodUid: number;
  public quantity: number;

  constructor(mountUid = 0, mountLocation = 0, mountFoodUid = 0, quantity = 0) {
    super();
    this.mountUid = mountUid;
    this.mountLocation = mountLocation;
    this.mountFoodUid = mountFoodUid;
    this.quantity = quantity;

  }
}
