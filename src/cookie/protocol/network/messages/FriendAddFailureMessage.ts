import Message from "@/protocol/network/messages/Message";

export default class FriendAddFailureMessage extends Message {
  public reason: number;

  constructor(reason = 0) {
    super();
    this.reason = reason;

  }
}
