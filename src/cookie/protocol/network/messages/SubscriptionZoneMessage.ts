import Message from "@/protocol/network/messages/Message";

export default class SubscriptionZoneMessage extends Message {
  public active: boolean;

  constructor(active = false) {
    super();
    this.active = active;

  }
}
