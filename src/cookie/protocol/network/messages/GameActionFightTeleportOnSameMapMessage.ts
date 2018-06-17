import AbstractGameActionMessage from "./AbstractGameActionMessage";

export default class GameActionFightTeleportOnSameMapMessage extends AbstractGameActionMessage {
  public targetId: number;
  public cellId: number;

  constructor(actionId = 0, sourceId = 0, targetId = 0, cellId = 0) {
    super(actionId, sourceId);
    this.targetId = targetId;
    this.cellId = cellId;

  }
}
