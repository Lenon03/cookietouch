import Message from "@/protocol/network/messages/Message";

export default class NotificationUpdateFlagMessage extends Message {
  public index: number;

  constructor(index = 0) {
    super();
    this.index = index;

  }
}
