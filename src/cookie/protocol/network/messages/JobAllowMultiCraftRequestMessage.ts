import Message from "@/protocol/network/messages/Message";

export default class JobAllowMultiCraftRequestMessage extends Message {
  public enabled: boolean;

  constructor(enabled = false) {
    super();
    this.enabled = enabled;

  }
}
