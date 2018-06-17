import MailStatusMessage from "./MailStatusMessage";

export default class NewMailMessage extends MailStatusMessage {
  public sendersAccountId: number[];

  constructor(unread = 0, total = 0, sendersAccountId: number[]) {
    super(unread, total);
    this.sendersAccountId = sendersAccountId;

  }
}
