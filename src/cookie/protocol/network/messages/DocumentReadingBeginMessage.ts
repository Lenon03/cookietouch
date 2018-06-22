import Message from "@/protocol/network/messages/Message";

export default class DocumentReadingBeginMessage extends Message {
  public documentId: number;

  constructor(documentId = 0) {
    super();
    this.documentId = documentId;

  }
}
