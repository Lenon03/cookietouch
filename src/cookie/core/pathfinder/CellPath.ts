export default class CellPath {
  public i: number;
  public j: number;
  public w: number;
  public d: number;
  public path: CellPath;

  constructor(i: number, j: number, w: number, d: number, path: CellPath) {
    this.i = i; // position i in the grid
    this.j = j; // position j in the grid
    this.w = w; // weight of the path
    this.d = d; // remaining distance to destination

    // positions previously taken in the path
    this.path = path;
  }
}
