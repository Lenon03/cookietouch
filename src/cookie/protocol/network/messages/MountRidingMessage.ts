import Message from "@/protocol/network/messages/Message";

export default class MountRidingMessage extends Message {
  public isRiding: boolean;

  constructor(isRiding = false) {
    super();
    this.isRiding = isRiding;

  }
}
