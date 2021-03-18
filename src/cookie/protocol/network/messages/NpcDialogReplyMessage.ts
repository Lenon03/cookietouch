import Message from "@/protocol/network/messages/Message";

export default class NpcDialogReplyMessage extends Message {
  public replyId: number;

  constructor(replyId = 0) {
    super();
    this.replyId = replyId;

  }
}
