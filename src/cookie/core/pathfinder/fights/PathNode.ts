export default class PathNode {
  public cellId: number;
  public availableMp: number;
  public availableAp: number;
  public tackleMp: number;
  public tackleAp: number;
  public distance: number;

  constructor(cellId: number, ap: number, mp: number,
              tackleAp: number, tackleMp: number, distance: number) {
    this.cellId = cellId;
    this.availableAp = ap;
    this.availableMp = mp;
    this.tackleAp = tackleAp;
    this.tackleMp = tackleMp;
    this.distance = distance;
  }
}
