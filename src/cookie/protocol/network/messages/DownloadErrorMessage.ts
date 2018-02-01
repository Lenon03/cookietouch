import Message from "./Message";

export default class DownloadErrorMessage extends Message {
  public errorId: number;
  public message: string;
  public helpUrl: string;

  constructor(errorId = 0, message = "", helpUrl = "") {
    super();
    this.errorId = errorId;
    this.message = message;
    this.helpUrl = helpUrl;

  }
}
