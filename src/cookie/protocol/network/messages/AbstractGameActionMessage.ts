import Message from "./Message";

export default class AbstractGameActionMessage extends Message {
  public actionId: number;
  public sourceId: number;

  constructor(actionId = 0, sourceId = 0) {
    super();
    this.actionId = actionId;
    this.sourceId = sourceId;
  }
}
