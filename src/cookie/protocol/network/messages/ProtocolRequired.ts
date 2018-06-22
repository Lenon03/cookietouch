import Message from "@/protocol/network/messages/Message";

export default class ProtocolRequired extends Message {
  public requiredVersion: number;
  public currentVersion: number;

  constructor(requiredVersion = 0, currentVersion = 0) {
    super();
    this.requiredVersion = requiredVersion;
    this.currentVersion = currentVersion;

  }
}
