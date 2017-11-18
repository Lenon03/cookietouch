import GameActionMarkedCell from "./GameActionMarkedCell";
export default class GameActionMark {
  public cells: GameActionMarkedCell[];
  public markAuthorId: number;
  public markSpellId: number;
  public markId: number;
  public markType: number;
  constructor(markAuthorId = 0, markSpellId = 0, markId = 0, markType = 0, cells: GameActionMarkedCell[]) {

    this.cells = cells;
    this.markAuthorId = markAuthorId;
    this.markSpellId = markSpellId;
    this.markId = markId;
    this.markType = markType;

  }
}
