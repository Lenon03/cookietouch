import AbstractGameActionMessage from "./AbstractGameActionMessage";

export default class GameActionFightSlideMessage extends AbstractGameActionMessage {
  public targetId: number;
  public startCellId: number;
  public endCellId: number;

  constructor(actionId = 0, sourceId = 0, targetId = 0, startCellId = 0, endCellId = 0) {
    super(actionId, sourceId);
    this.targetId = targetId;
    this.startCellId = startCellId;
    this.endCellId = endCellId;

  }
}
