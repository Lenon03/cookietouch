import AbstractGameActionMessage from "./AbstractGameActionMessage";

export default class GameActionFightExchangePositionsMessage extends AbstractGameActionMessage {
  public targetId: number;
  public casterCellId: number;
  public targetCellId: number;

  constructor(actionId = 0, sourceId = 0, targetId = 0, casterCellId = 0, targetCellId = 0) {
    super(actionId, sourceId);
    this.targetId = targetId;
    this.casterCellId = casterCellId;
    this.targetCellId = targetCellId;

  }
}
