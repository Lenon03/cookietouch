import Message from "@/protocol/network/messages/Message";

export default class BasicDateMessage extends Message {
  public day: number;
  public month: number;
  public year: number;

  constructor(day = 0, month = 0, year = 0) {
    super();
    this.day = day;
    this.month = month;
    this.year = year;

  }
}
