import AbstractGameActionMessage from "./AbstractGameActionMessage";

export default class GameActionFightInvisibilityMessage extends AbstractGameActionMessage {
  public targetId: number;
  public state: number;

  constructor(actionId = 0, sourceId = 0, targetId = 0, state = 0) {
    super(actionId, sourceId);
    this.targetId = targetId;
    this.state = state;

  }
}
