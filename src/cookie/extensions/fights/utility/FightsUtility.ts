import FightsPathfinder from "@/core/pathfinder/fights";
import MoveNode from "@/core/pathfinder/fights/MoveNode";
import MapPoint from "@/core/pathfinder/MapPoint";
import Account from "@account";
import SpellLevels from "@protocol/data/classes/SpellLevels";

export default class FightsUtility {
  private account: Account;

  constructor(account: Account) {
    this.account = account;
  }

  public spellIsHittingAnyEnemy(fromCellId: number, spellLevel: SpellLevels): boolean {
    for (const spellCell of this.account.game.fight.getSpellRange(fromCellId, spellLevel)) {
      for (const enemy of this.account.game.fight.enemies) {
        // This enemy is in range
        if (spellCell === enemy.cellId) {
          return true;
        }
      }
    }
    return false;
  }

  public getNearestOrFarthestEndMoveNode(nearest: boolean, basedOnAllMonsters = true): { key: number, value: MoveNode } {
    let node: { key: number, value: MoveNode } = null;
    let totalDistances = -1;
    let distance = -1;

    // Include our current cell
    totalDistances = basedOnAllMonsters
      ? this.getTotalDistancesFromEnemies(this.account.game.fight.playedFighter.cellId)
      : MapPoint.fromCellId(this.account.game.fight.playedFighter.cellId)
        .distanceToCell(MapPoint.fromCellId(this.account.game.fight.getNearestEnemy().cellId));

    for (const kvp of FightsPathfinder.getReachableZone(this.account.game.fight, this.account.game.map.data,
      this.account.game.fight.playedFighter.cellId)) {
      if (!kvp.value.reachable) {
        continue;
      }
      const tempTotalDistances = basedOnAllMonsters
        ? this.getTotalDistancesFromEnemies(kvp.key)
        : MapPoint.fromCellId(kvp.key).distanceToCell(MapPoint.fromCellId(this.account.game.fight.getNearestEnemy().cellId));

      if (nearest && tempTotalDistances <= totalDistances || !nearest && tempTotalDistances >= totalDistances) {
        if (nearest) {
          node = kvp;
          totalDistances = tempTotalDistances;
        } else if (kvp.value.path.reachable.length >= distance) {
          // If we need to give the farthest cell, we might as well give the one that uses the most available MP
          node = kvp;
          totalDistances = tempTotalDistances;
          distance = kvp.value.path.reachable.length;
        }
      }
    }

    return node;
  }

  public getNearestOrFarthestCell(nearest: boolean, possibleCells: number[]): number {
    let cellId = -1;
    let totalDistances = -1;

    for (const cell of possibleCells) {
      const tempTotalDistancess = this.getTotalDistancesFromEnemies(cell);

      if (cellId === -1 || nearest && tempTotalDistancess < totalDistances || !nearest && tempTotalDistancess > totalDistances) {
        cellId = cell;
        totalDistances = tempTotalDistancess;
      }
    }
    return cellId;
  }

  public getTotalDistancesFromEnemies(fromCellId: number): number {
    const mp = MapPoint.fromCellId(fromCellId);
    const cells = this.account.game.fight.enemies.map((e) => MapPoint.fromCellId(e.cellId));
    return cells.reduce((prev, next) => prev + mp.distanceToCell(next), 0);
  }
}
