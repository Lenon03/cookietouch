import Message from "./Message";

export default class LockableChangeCodeMessage extends Message {
  public code: string;

  constructor(code = "") {
    super();
    this.code = code;

  }
}
