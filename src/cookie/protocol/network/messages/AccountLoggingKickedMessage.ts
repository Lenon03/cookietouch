import Message from "@/protocol/network/messages/Message";

export default class AccountLoggingKickedMessage extends Message {
  public days: number;
  public hours: number;
  public minutes: number;

  constructor(days = 0, hours = 0, minutes = 0) {
    super();
    this.days = days;
    this.hours = hours;
    this.minutes = minutes;
  }
}
