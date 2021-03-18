import AbstractGameActionMessage from "@/protocol/network/messages/AbstractGameActionMessage";

export default class GameActionFightLifePointsGainMessage extends AbstractGameActionMessage {
  public targetId: number;
  public delta: number;

  constructor(actionId = 0, sourceId = 0, targetId = 0, delta = 0) {
    super(actionId, sourceId);
    this.targetId = targetId;
    this.delta = delta;

  }
}
