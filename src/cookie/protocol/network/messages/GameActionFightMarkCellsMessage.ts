import AbstractGameActionMessage from "@/protocol/network/messages/AbstractGameActionMessage";
import GameActionMark from "@/protocol/network/types/GameActionMark";

export default class GameActionFightMarkCellsMessage extends AbstractGameActionMessage {
  public mark: GameActionMark;

  constructor(actionId = 0, sourceId = 0, mark: GameActionMark) {
    super(actionId, sourceId);
    this.mark = mark;

  }
}
