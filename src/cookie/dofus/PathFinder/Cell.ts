export default class Cell {

  public static isWalkable(cell: Cell, isFightMode: boolean = false): boolean {
    return (cell.l & (isFightMode ? 5 : 1)) === 1;
  }

  public static isFarmCell(cell: Cell): boolean {
    return (cell.l & 32) === 32;
  }

  public static isVisible(cell: Cell): boolean {
    return (cell.l & 64) === 64;
  }

  public static isObstacle(cell: Cell): boolean {
    return (cell.l & 2) !== 2;
  }

  public l: number;
  public f: number;
  public c: number;
  public s: number;
  public z: number;
}
