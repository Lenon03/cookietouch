import Message from "@/protocol/network/messages/Message";

export default class ObjectUseMessage extends Message {
  public objectUID: number;

  constructor(objectUID = 0) {
    super();
    this.objectUID = objectUID;

  }
}
