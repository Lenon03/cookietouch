import GameActionMark from "@protocol/network/types/GameActionMark";
import AbstractGameActionMessage from "./AbstractGameActionMessage";

export default class GameActionFightMarkCellsMessage extends AbstractGameActionMessage {
  public mark: GameActionMark;

  constructor(actionId = 0, sourceId = 0, mark: GameActionMark) {
    super(actionId, sourceId);
    this.mark = mark;

  }
}
