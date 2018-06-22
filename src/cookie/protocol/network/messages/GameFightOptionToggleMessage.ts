import Message from "@/protocol/network/messages/Message";

export default class GameFightOptionToggleMessage extends Message {
  public option: number;

  constructor(option = 3) {
    super();
    this.option = option;

  }
}
