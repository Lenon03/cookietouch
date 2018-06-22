import Message from "@/protocol/network/messages/Message";

export default class IgnoredDeleteRequestMessage extends Message {
  public accountId: number;
  public session: boolean;

  constructor(accountId = 0, session = false) {
    super();
    this.accountId = accountId;
    this.session = session;

  }
}
