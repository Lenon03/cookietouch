import Message from "@/protocol/network/messages/Message";

export default class PrismInfoJoinLeaveRequestMessage extends Message {
  public join: boolean;

  constructor(join = false) {
    super();
    this.join = join;

  }
}
