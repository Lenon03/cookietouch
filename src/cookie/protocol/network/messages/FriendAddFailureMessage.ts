import Message from "./Message";

export default class FriendAddFailureMessage extends Message {
  public reason: number;

  constructor(reason = 0) {
    super();
    this.reason = reason;

  }
}
