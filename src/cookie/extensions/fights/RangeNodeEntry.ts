import MoveNode from "@/core/pathfinder/fights/MoveNode";
import Dictionary from "@utils/Dictionary";

export default class RangeNodeEntry {
  public fromCellId: number;
  public touchedEnemiesByCell: Dictionary<number, number>;
  public node: MoveNode;

  constructor(fromCellId: number, touchedEnemiesByCell: Dictionary<number, number>, node: MoveNode) {
    this.fromCellId = fromCellId;
    this.touchedEnemiesByCell = touchedEnemiesByCell;
    this.node = node;
  }

  get mpUsed() {
    return this.node.path.reachable.length > 0 ? this.node.path.reachable.length : 0;
  }
}
