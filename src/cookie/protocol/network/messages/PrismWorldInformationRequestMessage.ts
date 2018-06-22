import Message from "@/protocol/network/messages/Message";

export default class PrismWorldInformationRequestMessage extends Message {
  public join: boolean;

  constructor(join = false) {
    super();
    this.join = join;

  }
}
