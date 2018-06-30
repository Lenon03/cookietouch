import MoveNode from "@/core/pathfinder/fights/MoveNode";

export default class RangeNodeEntry {
  public fromCellId: number;
  public touchedEnemiesByCell: Map<number, number>;
  public node: MoveNode;

  constructor(
    fromCellId: number,
    touchedEnemiesByCell: Map<number, number>,
    node: MoveNode
  ) {
    this.fromCellId = fromCellId;
    this.touchedEnemiesByCell = touchedEnemiesByCell;
    this.node = node;
  }

  get mpUsed() {
    return this.node && this.node.path.reachable.length > 0
      ? this.node.path.reachable.length
      : 0;
  }
}
