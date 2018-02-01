import Message from "./Message";

export default class NotificationListMessage extends Message {
  public flags: number[];

  constructor(flags: number[]) {
    super();
    this.flags = flags;

  }
}
