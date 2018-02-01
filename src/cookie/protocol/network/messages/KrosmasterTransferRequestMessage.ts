import Message from "./Message";

export default class KrosmasterTransferRequestMessage extends Message {
  public uid: string;

  constructor(uid = "") {
    super();
    this.uid = uid;

  }
}
