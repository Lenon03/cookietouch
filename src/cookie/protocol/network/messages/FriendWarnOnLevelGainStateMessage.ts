import Message from "@/protocol/network/messages/Message";

export default class FriendWarnOnLevelGainStateMessage extends Message {
  public enable: boolean;

  constructor(enable = false) {
    super();
    this.enable = enable;

  }
}
