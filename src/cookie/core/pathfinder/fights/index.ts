import FightGame from "@game/fight";
import FighterEntry from "@game/fight/fighters/FighterEntry";
import Map from "@protocol/data/map";
import { GameActionFightInvisibilityStateEnum } from "@protocol/enums/GameActionFightInvisibilityStateEnum";
import Dictionary from "@utils/Dictionary";
import MapPoint from "../MapPoint";
import FightPath from "./FightPath";
import MoveNode from "./MoveNode";
import PathNode from "./PathNode";

export default class FightsPathfinder {
  public static getPath(
    source: number,
    target: number,
    zone: Dictionary<number, MoveNode>
  ): FightPath {
    if (!zone.containsKey(target)) {
      return null;
    }

    let current = target;
    const reachable: number[] = [];
    const unreachable: number[] = [];
    const reachableMap = new Dictionary<number, number>();
    const unreachableMap = new Dictionary<number, number>();
    let ap = 0;
    let mp = 0;
    let distance = 0;

    while (current !== source) {
      const cell = zone.getValue(current);
      if (cell.reachable) {
        reachable.unshift(current);
        reachableMap.add(current, distance);
      } else {
        unreachable.unshift(current);
        unreachableMap.add(current, distance);
      }

      mp += cell.mp;
      ap += cell.ap;
      current = cell.from;
      distance += 1;
    }

    return new FightPath(
      reachable,
      unreachable,
      reachableMap,
      unreachableMap,
      ap,
      mp
    );
  }

  public static getReachableZone(
    fight: FightGame,
    map: Map,
    currentCellId: number
  ): Dictionary<number, MoveNode> {
    const zone = new Dictionary<number, MoveNode>();

    if (fight.playedFighter.movementPoints <= 0) {
      return zone;
    }

    const maxDistance = fight.playedFighter.movementPoints;
    const opened: PathNode[] = [];
    const closed = new Dictionary<number, PathNode>();

    let node = new PathNode(
      currentCellId,
      fight.playedFighter.actionPoints,
      fight.playedFighter.movementPoints,
      0,
      0,
      1
    );
    opened.push(node);
    closed.add(currentCellId, node); // TODO: No changeValueForKey

    while (opened.length > 0) {
      const current = opened.pop();
      const cellId = current.cellId;
      const neighbours = MapPoint.getNeighbourCells(cellId, false);

      const tacklers = [];
      let i = 0;
      while (i < neighbours.length) {
        let tackler;
        const neigh = neighbours[i];
        if (neigh) {
          tackler = fight.fighters.find(f => f.cellId === neigh.cellId);
        }
        if (neigh !== undefined && tackler === undefined) {
          i++;
          continue;
        }

        neighbours.splice(i, 1);
        if (tackler !== undefined) {
          tacklers.push(tackler);
        }
      }
      const test = { apCost: 0, mpCost: 0 };
      this.getTackleCost(
        fight,
        tacklers,
        current.availableMp,
        current.availableAp,
        test
      );

      const availableMp = current.availableMp - test.mpCost - 1;
      const availableAp = current.availableAp - test.apCost;
      const tackleMp = current.tackleMp + test.mpCost;
      const tackleAp = current.tackleAp + test.apCost;
      const distance = current.distance + 1;
      const reachable = availableMp >= 0;

      // TODO: Handle Marked cells

      for (const neighbour of neighbours) {
        if (closed.containsKey(neighbour.cellId)) {
          const previous = closed.getValue(neighbour.cellId);
          if (previous.availableMp > availableMp) {
            continue;
          }

          if (
            previous.availableMp === availableMp &&
            previous.availableAp >= availableAp
          ) {
            continue;
          }
        }
        if (!map.cells[neighbour.cellId].isWalkable(true)) {
          continue;
        }
        if (zone.containsKey(neighbour.cellId)) {
          // TODO: Check if it's right
          zone.changeValueForKey(
            neighbour.cellId,
            new MoveNode(test.apCost, test.mpCost, cellId, reachable)
          );
        } else {
          zone.add(
            neighbour.cellId,
            new MoveNode(test.apCost, test.mpCost, cellId, reachable)
          );
        }
        node = new PathNode(
          neighbour.cellId,
          availableAp,
          availableMp,
          tackleAp,
          tackleMp,
          distance
        );
        if (closed.containsKey(neighbour.cellId)) {
          // TODO: Check if it's right
          closed.changeValueForKey(neighbour.cellId, node);
        } else {
          closed.add(neighbour.cellId, node);
        }

        if (current.distance < maxDistance) {
          opened.push(node);
        }
      }
    }

    for (const cellKey of zone.keys()) {
      const elem = zone.getValue(cellKey);
      elem.path = this.getPath(currentCellId, cellKey, zone);
      zone.changeValueForKey(cellKey, elem);
    }

    return zone;
  }

  private static getTackleCost(
    fight: FightGame,
    tacklers: FighterEntry[],
    mp: number,
    ap: number,
    test: { apCost: number; mpCost: number }
  ) {
    mp = Math.max(0, mp);
    ap = Math.max(0, ap);

    test.mpCost = 0;
    test.apCost = 0;

    if (
      !this.canBeTackled(fight, fight.playedFighter) ||
      tacklers.length === 0
    ) {
      return;
    }

    for (const tackler of tacklers) {
      if (!tackler.alive) {
        continue;
      }

      if (!this.canBeTackler(tackler, fight.playedFighter)) {
        continue;
      }

      const tackleRatio = this.getTackleRatio(fight.playedFighter, tackler);

      if (tackleRatio >= 1) {
        continue;
      }

      test.mpCost += mp * (1 - tackleRatio) + 0.5;
      test.apCost += ap * (1 - tackleRatio) + 0.5;
    }
  }

  private static canBeTackler(
    tackler: FighterEntry = null,
    actor: FighterEntry = null
  ): boolean {
    if (tackler === null || actor === null) {
      return false;
    }

    if (
      !tackler.alive ||
      tackler.stats.invisibilityState !==
        GameActionFightInvisibilityStateEnum.VISIBLE
    ) {
      return false;
    }

    if (tackler.team === actor.team) {
      return false;
    }

    return true;
  }

  private static getTackleRatio(
    actor: FighterEntry,
    tackler: FighterEntry
  ): number {
    const evade = Math.max(0, actor.stats.tackleEvade);
    const block = Math.max(0, tackler.stats.tackleBlock);
    return (evade + 2) / (block + 2) / 2;
  }

  private static canBeTackled(fight: FightGame, actor: FighterEntry): boolean {
    if (
      actor.stats.invisibilityState !==
      GameActionFightInvisibilityStateEnum.VISIBLE
    ) {
      return false;
    }

    // TODO: Add carried condition

    if (fight.hasState(96) || fight.hasState(6)) {
      return false;
    }

    return true;
  }
}
