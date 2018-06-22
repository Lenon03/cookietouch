import Message from "@/protocol/network/messages/Message";

export default class SequenceStartMessage extends Message {
  public sequenceType: number;
  public authorId: number;

  constructor(sequenceType = 0, authorId = 0) {
    super();
    this.sequenceType = sequenceType;
    this.authorId = authorId;

  }
}
