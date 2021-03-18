export default class FightPath {
  public reachable: number[];
  public unreachable: number[];
  public reachableMap: Map<number, number>;
  public unreachableMap: Map<number, number>;
  public ap: number;
  public mp: number;

  constructor(
    reachable: number[],
    unreachable: number[],
    reachableMap: Map<number, number>,
    unreachableMap: Map<number, number>,
    ap: number,
    mp: number
  ) {
    this.reachable = reachable;
    this.unreachable = unreachable;
    this.reachableMap = reachableMap;
    this.unreachableMap = unreachableMap;
    this.ap = ap;
    this.mp = mp;
  }
}
