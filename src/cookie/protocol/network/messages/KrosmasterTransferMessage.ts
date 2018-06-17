import Message from "./Message";

export default class KrosmasterTransferMessage extends Message {
  public uid: string;
  public failure: number;

  constructor(uid = "", failure = 0) {
    super();
    this.uid = uid;
    this.failure = failure;

  }
}
