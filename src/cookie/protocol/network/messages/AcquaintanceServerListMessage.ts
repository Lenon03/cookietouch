import Message from "@/protocol/network/messages/Message";

export default class AcquaintanceServerListMessage extends Message {
  public servers: number[];

  constructor(servers: number[]) {
    super();
    this.servers = servers;

  }
}
