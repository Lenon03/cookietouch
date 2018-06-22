import Message from "@/protocol/network/messages/Message";

export default class ContactLookRequestMessage extends Message {
  public requestId: number;
  public contactType: number;

  constructor(requestId = 0, contactType = 0) {
    super();
    this.requestId = requestId;
    this.contactType = contactType;

  }
}
