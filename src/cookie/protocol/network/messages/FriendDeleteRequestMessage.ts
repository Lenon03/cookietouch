import Message from "@/protocol/network/messages/Message";

export default class FriendDeleteRequestMessage extends Message {
  public accountId: number;

  constructor(accountId = 0) {
    super();
    this.accountId = accountId;

  }
}
