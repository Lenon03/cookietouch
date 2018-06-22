import FightPath from "@/core/pathfinder/fights/FightPath";

export default class MoveNode {
  public ap: number;
  public mp: number;
  public from: number;
  public reachable: boolean;
  public path: FightPath;

  constructor(ap: number, mp: number, from: number, reachable: boolean) {
    this.ap = ap;
    this.mp = mp;
    this.from = from;
    this.reachable = reachable;
  }
}
