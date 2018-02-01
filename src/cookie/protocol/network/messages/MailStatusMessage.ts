import Message from "./Message";

export default class MailStatusMessage extends Message {
  public unread: number;
  public total: number;

  constructor(unread = 0, total = 0) {
    super();
    this.unread = unread;
    this.total = total;

  }
}
