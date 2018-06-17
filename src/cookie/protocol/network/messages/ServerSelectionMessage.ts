import Message from "./Message";

export default class ServerSelectionMessage extends Message {
  public serverId: number;

  constructor(serverId = 0) {
    super();
    this.serverId = serverId;

  }
}
