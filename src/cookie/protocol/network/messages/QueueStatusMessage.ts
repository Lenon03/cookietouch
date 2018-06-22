import Message from "@/protocol/network/messages/Message";

export default class QueueStatusMessage extends Message {
  public position: number;
  public total: number;

  constructor(position = 0, total = 0) {
    super();
    this.position = position;
    this.total = total;

  }
}
