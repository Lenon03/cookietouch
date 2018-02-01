import AbstractGameActionMessage from "./AbstractGameActionMessage";

export default class GameActionFightStateChangeMessage extends AbstractGameActionMessage {
  public targetId: number;
  public stateId: number;
  public active: boolean;

  constructor(actionId = 0, sourceId = 0, targetId = 0, stateId = 0, active = false) {
    super(actionId, sourceId);
    this.targetId = targetId;
    this.stateId = stateId;
    this.active = active;

  }
}
