import Message from "./Message";

export default class OnConnectionEventMessage extends Message {
  public eventType: number;

  constructor(eventType = 0) {
    super();
    this.eventType = eventType;

  }
}
