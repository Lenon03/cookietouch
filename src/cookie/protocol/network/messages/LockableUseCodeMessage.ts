import Message from "@/protocol/network/messages/Message";

export default class LockableUseCodeMessage extends Message {
  public code: string;

  constructor(code = "") {
    super();
    this.code = code;

  }
}
