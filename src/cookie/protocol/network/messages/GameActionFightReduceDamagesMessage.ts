import AbstractGameActionMessage from "./AbstractGameActionMessage";

export default class GameActionFightReduceDamagesMessage extends AbstractGameActionMessage {
  public targetId: number;
  public amount: number;

  constructor(actionId = 0, sourceId = 0, targetId = 0, amount = 0) {
    super(actionId, sourceId);
    this.targetId = targetId;
    this.amount = amount;

  }
}
