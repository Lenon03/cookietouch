import GameActionMarkedCell from "./GameActionMarkedCell";
import Type from "./Type";

export default class GameActionMark extends Type {
  public cells: GameActionMarkedCell[];
  public markAuthorId: number;
  public markSpellId: number;
  public markId: number;
  public markType: number;

  constructor(markAuthorId = 0, markSpellId = 0, markId = 0, markType = 0, cells: GameActionMarkedCell[]) {
    super();
    this.cells = cells;
    this.markAuthorId = markAuthorId;
    this.markSpellId = markSpellId;
    this.markId = markId;
    this.markType = markType;
  }
}
