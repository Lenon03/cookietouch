import Message from "./Message";

export default class LockableUseCodeMessage extends Message {
  public code: string;

  constructor(code = "") {
    super();
    this.code = code;

  }
}
