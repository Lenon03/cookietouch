export default class Cell {

  public l: number;
  public f: number;
  public c: number;
  public s: number;
  public z: number;

  constructor(l?: number, f?: number, c?: number, s?: number, z?: number) {
    this.l = l;
    this.f = f;
    this.c = c;
    this.s = s;
    this.z = z;
  }

  public isWalkable(isFightMode: boolean = false): boolean {
    return (this.l & (isFightMode ? 5 : 1)) === 1;
  }

  public isFarmCell(): boolean {
    return (this.l & 32) === 32;
  }

  public isVisible(): boolean {
    return (this.l & 64) === 64;
  }

  public isObstacle(): boolean {
    return (this.l & 2) !== 2;
  }
}
