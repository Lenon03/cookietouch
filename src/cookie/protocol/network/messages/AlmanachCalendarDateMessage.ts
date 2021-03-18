import Message from "@/protocol/network/messages/Message";

export default class AlmanachCalendarDateMessage extends Message {
  public date: number;

  constructor(date = 0) {
    super();
    this.date = date;

  }
}
