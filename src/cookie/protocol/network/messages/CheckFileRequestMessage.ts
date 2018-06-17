import Message from "./Message";

export default class CheckFileRequestMessage extends Message {
  public filename: string;
  public type: number;

  constructor(filename = "", type = 0) {
    super();
    this.filename = filename;
    this.type = type;

  }
}
