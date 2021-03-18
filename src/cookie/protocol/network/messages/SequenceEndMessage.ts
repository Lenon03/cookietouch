import Message from "@/protocol/network/messages/Message";

export default class SequenceEndMessage extends Message {
  public actionId: number;
  public authorId: number;
  public sequenceType: number;

  constructor(actionId = 0, authorId = 0, sequenceType = 0) {
    super();
    this.actionId = actionId;
    this.authorId = authorId;
    this.sequenceType = sequenceType;

  }
}
