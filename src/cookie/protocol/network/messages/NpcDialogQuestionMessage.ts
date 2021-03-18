import Message from "@/protocol/network/messages/Message";

export default class NpcDialogQuestionMessage extends Message {
  public dialogParams: string[];
  public visibleReplies: number[];
  public messageId: number;

  constructor(messageId = 0, dialogParams: string[], visibleReplies: number[]) {
    super();
    this.dialogParams = dialogParams;
    this.visibleReplies = visibleReplies;
    this.messageId = messageId;

  }
}
