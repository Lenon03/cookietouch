import Dictionary from "@utils/Dictionary";

export default class FightPath {
  public reachable: number[];
  public unreachable: number[];
  public reachableMap: Dictionary<number, number>;
  public unreachableMap: Dictionary<number, number>;
  public ap: number;
  public mp: number;

  constructor(reachable: number[], unreachable: number[], reachableMap: Dictionary<number, number>,
              unreachableMap: Dictionary<number, number>, ap: number, mp: number) {
    this.reachable = reachable;
    this.unreachable = unreachable;
    this.reachableMap = reachableMap;
    this.unreachableMap = unreachableMap;
    this.ap = ap;
    this.mp = mp;
  }
}
