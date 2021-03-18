export default class Cell {
  public l: number | undefined;
  public f: number | undefined;
  public c: number | undefined;
  public s: number | undefined;
  public z: number | undefined;

  constructor(l?: number, f?: number, c?: number, s?: number, z?: number) {
    this.l = l;
    this.f = f;
    this.c = c;
    this.s = s;
    this.z = z;
  }

  public isWalkable(isFightMode: boolean = false): boolean {
    if (!this.l) {
      return false;
    }
    return (this.l & (isFightMode ? 5 : 1)) === 1;
  }

  public isFarmCell(): boolean {
    if (!this.l) {
      return false;
    }
    return (this.l & 32) === 32;
  }

  public isVisible(): boolean {
    if (!this.l) {
      return false;
    }
    return (this.l & 64) === 64;
  }

  public isObstacle(): boolean {
    if (!this.l) {
      return false;
    }
    return (this.l & 2) !== 2;
  }
}
