import Message from "@/protocol/network/messages/Message";

export default class KrosmasterTransferRequestMessage extends Message {
  public uid: string;

  constructor(uid = "") {
    super();
    this.uid = uid;

  }
}
