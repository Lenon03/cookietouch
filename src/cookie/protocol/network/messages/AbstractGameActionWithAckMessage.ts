import AbstractGameActionMessage from "./AbstractGameActionMessage";
export default class AbstractGameActionWithAckMessage extends AbstractGameActionMessage {
  public waitAckId: number;
  constructor(actionId = 0, sourceId = 0, waitAckId = 0) {
    super(actionId, sourceId);
    this.waitAckId = waitAckId;

  }
}
