import Message from "@/protocol/network/messages/Message";

export default class PrismFightStateUpdateMessage extends Message {
  public state: number;

  constructor(state = 0) {
    super();
    this.state = state;

  }
}
