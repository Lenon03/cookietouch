import AbstractGameActionMessage from "@/protocol/network/messages/AbstractGameActionMessage";

export default class GameActionFightUnmarkCellsMessage extends AbstractGameActionMessage {
  public markId: number;

  constructor(actionId = 0, sourceId = 0, markId = 0) {
    super(actionId, sourceId);
    this.markId = markId;

  }
}
