import Message from "./Message";

export default class CheckFileMessage extends Message {
  public filenameHash: string;
  public type: number;
  public value: string;

  constructor(filenameHash = "", type = 0, value = "") {
    super();
    this.filenameHash = filenameHash;
    this.type = type;
    this.value = value;

  }
}
