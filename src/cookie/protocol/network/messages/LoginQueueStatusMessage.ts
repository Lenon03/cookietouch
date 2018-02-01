import Message from "./Message";

export default class LoginQueueStatusMessage extends Message {
  public position: number;
  public total: number;

  constructor(position = 0, total = 0) {
    super();
    this.position = position;
    this.total = total;

  }
}
