import Message from "./Message";

export default class ChatSmileyMessage extends Message {
  public entityId: number;
  public smileyId: number;
  public accountId: number;

  constructor(entityId = 0, smileyId = 0, accountId = 0) {
    super();
    this.entityId = entityId;
    this.smileyId = smileyId;
    this.accountId = accountId;

  }
}
