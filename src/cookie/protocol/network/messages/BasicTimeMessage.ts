import Message from "@/protocol/network/messages/Message";

export default class BasicTimeMessage extends Message {
  public timestamp: number;
  public timezoneOffset: number;

  constructor(timestamp = 0, timezoneOffset = 0) {
    super();
    this.timestamp = timestamp;
    this.timezoneOffset = timezoneOffset;

  }
}
