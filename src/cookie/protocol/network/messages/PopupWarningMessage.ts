import Message from "./Message";

export default class PopupWarningMessage extends Message {
  public lockDuration: number;
  public author: string;
  public content: string;

  constructor(lockDuration = 0, author = "", content = "") {
    super();
    this.lockDuration = lockDuration;
    this.author = author;
    this.content = content;

  }
}
