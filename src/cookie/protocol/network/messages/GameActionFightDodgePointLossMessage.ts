import AbstractGameActionMessage from "@/protocol/network/messages/AbstractGameActionMessage";

export default class GameActionFightDodgePointLossMessage extends AbstractGameActionMessage {
  public targetId: number;
  public amount: number;

  constructor(actionId = 0, sourceId = 0, targetId = 0, amount = 0) {
    super(actionId, sourceId);
    this.targetId = targetId;
    this.amount = amount;

  }
}
