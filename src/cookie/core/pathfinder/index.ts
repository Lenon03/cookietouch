import CellData from "@/core/pathfinder/CellData";
import CellPath from "@/core/pathfinder/CellPath";
import MapPoint from "@/core/pathfinder/MapPoint";
import Shaper from "@/core/pathfinder/shapes/zones/Shaper";
import MonstersGroupEntry from "@/game/map/entities/MonstersGroupEntry";
import Map from "@/protocol/data/map";
import Cell from "@/protocol/data/map/Cell";
import { union } from "@/utils/Arrays";
import agroData from "./agroData.json";

export default class Pathfinder {
  private readonly OCCUPIED_CELL_WEIGHT = 10;
  private readonly ELEVATION_TOLERANCE = 11.825;
  private readonly WIDTH = 35;
  private readonly HEIGHT = 36;
  private firstCellZone = 0;
  private grid: CellData[][];
  private oldGrid: CellData[][];
  private oldMovementSystem: boolean;

  constructor() {
    this.grid = Array(this.WIDTH)
      .fill(0)
      .map(() => Array(this.HEIGHT).fill(0));
  }

  public setMap(map: Map) {
    // TODO: add whether a map uses the old system onto the map data
    // when it is generated on the server side
    // this.oldMovementSystem = map.usesOldMovementSystem;
    this.firstCellZone = map.cells[0].z || 0;
    this.oldMovementSystem = true;
    for (let i = 0; i < this.WIDTH; i++) {
      for (let j = 0; j < this.HEIGHT; j++) {
        this.grid[i][j] = new CellData(i, j);
        const p = MapPoint.fromCoords(i - 1, j - 1);
        this.updateCellPath2(
          p === null ? null : map.cells[p.cellId],
          this.grid[i][j]
        );
      }
    }
    this.oldGrid = JSON.parse(JSON.stringify(this.grid));
  }

  public getPath(
    source: number,
    target: number,
    occupiedCells: number[],
    monstersGroup: MonstersGroupEntry[],
    allowDiagonal: boolean,
    stopNextToTarget: boolean,
    antiAgro: boolean = false
  ): number[] {
    this.antiAgro(monstersGroup, antiAgro);
    let c = 0;
    let candidate: CellPath = null;
    const srcPos = MapPoint.fromCellId(source);
    const dstPos = MapPoint.fromCellId(target);
    const si = srcPos.x + 1;
    const sj = srcPos.y + 1;
    const srcCell = this.grid[si][sj];
    if (srcCell.zone === -1) {
      let bestFit: CellData = null;
      let bestDist = Infinity;
      let bestFloorDiff = Infinity;
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          if (i === 0 && j === 0) {
            continue;
          }
          const cell = this.grid[si + i][sj + j];
          if (cell.zone === -1) {
            continue;
          }
          const floorDiff = Math.abs(cell.floor - srcCell.floor);
          const dist = Math.abs(i) + Math.abs(j);
          if (
            bestFit === null ||
            floorDiff < bestFloorDiff ||
            (floorDiff <= bestFloorDiff && dist < bestDist)
          ) {
            bestFit = cell;
            bestDist = dist;
            bestFloorDiff = floorDiff;
          }
        }
      }
      if (bestFit !== null) {
        return [
          source,
          MapPoint.fromCoords(bestFit.i + 1, bestFit.j + 1).cellId
        ];
      }
      throw new Error(`[Pathfinder] Player stuck in ${si}/${sj}`);
    }
    const di = dstPos.x + 1;
    const dj = dstPos.y + 1;
    let cellPos: MapPoint = null;
    for (const cellId of occupiedCells) {
      cellPos = MapPoint.fromCellId(cellId);
      this.grid[cellPos.x + 1][
        cellPos.y + 1
      ].weight += this.OCCUPIED_CELL_WEIGHT;
    }
    let candidates = [];
    const selections = [];
    const distSrcDst = Math.sqrt(Math.pow(si - di, 2) + Math.pow(sj - dj, 2));
    let selection = new CellPath(si, sj, 0, distSrcDst, null);
    let reachingPath: CellPath = null;
    let closestPath = selection;
    while (selection.i !== di || selection.j !== dj) {
      this.addCandidates(selection, di, dj, candidates, allowDiagonal);
      const n = candidates.length;
      if (n === 0) {
        selection = closestPath; // TODO: Value assigned is not used in any execution path ?
        break;
      }
      let minPotentialWeight = Infinity;
      let selectionIndex = 0;
      for (c = 0; c < n; c++) {
        candidate = candidates[c];
        if (candidate.w + candidate.d < minPotentialWeight) {
          selection = candidate;
          minPotentialWeight = candidate.w + candidate.d;
          selectionIndex = c;
        }
      }
      selections.push(selection);
      candidates.splice(selectionIndex, 1);
      if (selection.d === 0 || (stopNextToTarget && selection.d < 1.5)) {
        // Selected path reached destination
        if (reachingPath === null || selection.w < reachingPath.w) {
          reachingPath = selection;
          closestPath = selection;

          // Clearing candidates dominated by current solution to speed up the algorithm
          const trimmedCandidates: CellPath[] = [];
          for (c = 0; c < candidates.length; c += 1) {
            candidate = candidates[c];
            if (candidate.w + candidate.d < reachingPath.w) {
              trimmedCandidates.push(candidate);
            } else {
              this.grid[candidate.i][candidate.j].candidateRef = null;
            }
          }
          candidates = trimmedCandidates;
        }
      } else {
        if (selection.d < closestPath.d) {
          closestPath = selection;
        }
      }
    }
    for (c = 0; c < candidates.length; c++) {
      candidate = candidates[c];
      this.grid[candidate.i][candidate.j].candidateRef = null;
    }
    for (const t of selections) {
      this.grid[t.i][t.j].candidateRef = null;
    }
    for (const cellId of occupiedCells) {
      cellPos = MapPoint.fromCellId(cellId);
      this.grid[cellPos.x + 1][
        cellPos.y + 1
      ].weight += this.OCCUPIED_CELL_WEIGHT;
    }
    const shortestPath = [];
    while (closestPath !== null) {
      shortestPath.unshift(
        MapPoint.fromCoords(closestPath.i - 1, closestPath.j - 1).cellId
      );
      closestPath = closestPath.path;
    }
    return shortestPath;
  }

  public compressPath(path: number[]): number[] {
    const compressedPath = [];
    let prevCellId = path[0];
    let prevDirection = -1;
    let prevX = 0;
    let prevY = 0;

    for (let i = 0; i < path.length; i++) {
      let direction = 0;
      const coord = MapPoint.fromCellId(path[i]);
      if (i === 0) {
        direction = -1;
      } else {
        if (coord.y === prevY) {
          direction = coord.x > prevX ? 7 : 3;
        } else if (coord.x === prevX) {
          direction = coord.y > prevY ? 1 : 5;
        } else {
          if (coord.x > prevX) {
            direction = coord.y > prevY ? 0 : 6;
          } else {
            direction = coord.y > prevY ? 2 : 4;
          }
        }
      }
      if (direction !== prevDirection) {
        compressedPath.push(prevCellId + (direction << 12));
        prevDirection = direction;
      }
      prevCellId = path[i];
      prevX = coord.x;
      prevY = coord.y;
    }
    compressedPath.push(prevCellId + (prevDirection << 12));
    return compressedPath;
  }

  public normalizePath(path: number[]): number[] {
    return this.checkPath(path) ? path : this.expandPath(path);
  }

  public getAccessibleCells(i: number, j: number): MapPoint[] {
    i++;
    j++;
    const c = this.grid[i][j];
    const accessibleCells = [];
    for (const cell of this.getAdjacentCells(i, j)) {
      if (this.areCommunicating(c, cell)) {
        accessibleCells.push(MapPoint.fromCoords(cell.i - 1, cell.j - 1));
      }
    }
    return accessibleCells;
  }

  public updateCellPath(cellId: number, cell: Cell) {
    const p = MapPoint.fromCellId(cellId);
    this.updateCellPath2(cell, this.grid[p.x + 1][p.y + 1]);
  }

  public expandPath(path: number[]): number[] {
    if (path.length < 2) {
      return path;
    }
    const result = [];
    result.push(path[0]);

    let previous = MapPoint.fromCellId(path[0]);
    for (let i = 1; i < path.length; i++) {
      const coord = MapPoint.fromCellId(path[i]);
      let incrX = 0;
      let incrY = 0;
      const c = Math.abs(coord.x - previous.x);
      const d = Math.abs(coord.y - previous.y);
      if (c === 0 || d === 0) {
        if (c > 1) {
          incrX = coord.x > previous.x ? 1 : -1;
          previous.x += incrX;
          while (previous.x !== coord.x) {
            result.push(MapPoint.fromCoords(previous.x, previous.y).cellId);
            previous.x += incrX;
          }
        }
        if (d > 1) {
          incrY = coord.y > previous.y ? 1 : -1;
          previous.y += incrY;
          while (previous.y !== coord.y) {
            result.push(MapPoint.fromCoords(previous.x, previous.y).cellId);
            previous.y += incrY;
          }
        }
      } else if (c === d) {
        incrX = coord.x > previous.x ? 1 : -1;
        incrY = coord.y > previous.y ? 1 : -1;
        while (previous.y !== coord.y) {
          result.push(MapPoint.fromCoords(previous.x, previous.y).cellId);
          previous.x += incrX;
          previous.y += incrY;
        }
      }
      previous = coord;
      result.push(path[i]);
    }
    return result;
  }

  private checkPath(path: number[]): boolean {
    if (path.length < 2) {
      return false;
    }
    let prev = MapPoint.fromCellId(path[0]);
    for (const c of path) {
      const coord = MapPoint.fromCellId(c);
      if (Math.abs(prev.x - coord.x) > 1) {
        return false;
      }
      if (Math.abs(prev.y - coord.y) > 1) {
        return false;
      }
      prev = coord;
    }
    return true;
  }

  private updateCellPath2(cell: Cell, cellPath: CellData) {
    if (cell !== null && cell.isWalkable(false)) {
      cellPath.floor = cell.f || 0;
      cellPath.zone = cell.z || 0;
      cellPath.speed = 1 + (cell.s || 0) / 10;
      if (cellPath.zone !== this.firstCellZone) {
        this.oldMovementSystem = false;
      }
    } else {
      cellPath.floor = -1;
      cellPath.zone = -1;
    }
  }

  private areCommunicating(c1: CellData, c2: CellData): boolean {
    if (c1.floor === c2.floor) {
      return true;
    }
    if (c1.zone === c2.zone) {
      return (
        this.oldMovementSystem ||
        c1.zone !== 0 ||
        Math.abs(c1.floor - c2.floor) <= this.ELEVATION_TOLERANCE
      );
    }
    return false;
  }

  private canMoveDiagonnalyTo(
    c1: CellData,
    c2: CellData,
    c3: CellData,
    c4: CellData
  ): boolean {
    return (
      this.areCommunicating(c1, c2) &&
      (this.areCommunicating(c1, c3) || this.areCommunicating(c1, c4))
    );
  }

  private addCandidate(
    c: CellData,
    weight: number,
    di: number,
    dj: number,
    candidates: CellPath[],
    path: CellPath
  ) {
    const distanceToDestination = Math.sqrt(
      Math.pow(di - c.i, 2) + Math.pow(dj - c.j, 2)
    );
    weight = weight / c.speed + c.weight;

    if (c.candidateRef === null) {
      const candidateRef = new CellPath(
        c.i,
        c.j,
        path.w + weight,
        distanceToDestination,
        path
      );
      candidates.push(candidateRef);
      c.candidateRef = candidateRef;
    } else {
      const newWeight = path.w + weight;
      if (newWeight < c.candidateRef.w) {
        c.candidateRef.w = newWeight;
        c.candidateRef.path = path;
      }
    }
  }

  private addCandidates(
    path: CellPath,
    di: number,
    dj: number,
    candidates: CellPath[],
    allowDiagonals: boolean
  ) {
    const i = path.i;
    const j = path.j;
    const c = this.grid[i][j];

    const c01 = this.grid[i - 1][j];
    const c10 = this.grid[i][j - 1];
    const c12 = this.grid[i][j + 1];
    const c21 = this.grid[i + 1][j];

    if (this.areCommunicating(c, c01)) {
      this.addCandidate(c01, 1, di, dj, candidates, path);
    }
    if (this.areCommunicating(c, c21)) {
      this.addCandidate(c21, 1, di, dj, candidates, path);
    }
    if (this.areCommunicating(c, c10)) {
      this.addCandidate(c10, 1, di, dj, candidates, path);
    }
    if (this.areCommunicating(c, c12)) {
      this.addCandidate(c12, 1, di, dj, candidates, path);
    }

    if (allowDiagonals) {
      const c00 = this.grid[i - 1][j - 1];
      const c02 = this.grid[i - 1][j + 1];
      const c20 = this.grid[i + 1][j - 1];
      const c22 = this.grid[i + 1][j + 1];

      const weightDiagonal = Math.sqrt(2);

      if (this.canMoveDiagonnalyTo(c, c00, c01, c10)) {
        this.addCandidate(c00, weightDiagonal, di, dj, candidates, path);
      }
      if (this.canMoveDiagonnalyTo(c, c20, c21, c10)) {
        this.addCandidate(c20, weightDiagonal, di, dj, candidates, path);
      }
      if (this.canMoveDiagonnalyTo(c, c02, c01, c12)) {
        this.addCandidate(c02, weightDiagonal, di, dj, candidates, path);
      }
      if (this.canMoveDiagonnalyTo(c, c22, c21, c12)) {
        this.addCandidate(c22, weightDiagonal, di, dj, candidates, path);
      }
    }
  }

  private getAdjacentCells(i: number, j: number): CellData[] {
    const cells = [];
    cells.push(this.grid[i - 1][j]);
    cells.push(this.grid[i][j - 1]);
    cells.push(this.grid[i][j + 1]);
    cells.push(this.grid[i + 1][j]);
    return cells;
  }

  private antiAgro(
    monstersGroup: MonstersGroupEntry[],
    antiAgro: boolean = false
  ) {
    if (this.oldGrid) {
      // we must iterate through the oldGrid array because if we do
      // pathFinder.grid = oldGrid we will erase the reference to the real pathfinder's grid
      for (let i = 0; i < this.oldGrid.length; i++) {
        for (let j = 0; j < this.oldGrid[i].length; j++) {
          this.grid[i][j].zone = this.oldGrid[i][j].zone;
          this.grid[i][j].floor = this.oldGrid[i][j].floor;
        }
      }
    }

    // collect the cells for every agressive mobs on the map
    let cells: MapPoint[] = [];

    const aggressiveMonstersGroups: MonstersGroupEntry[] = [];
    for (const m of monstersGroup) {
      for (const a of agroData.monsters) {
        if (m.containsMonster(a) && !aggressiveMonstersGroups.includes(m)) {
          aggressiveMonstersGroups.push(m);
        }
      }
    }

    for (const m of aggressiveMonstersGroups) {
      const cell = MapPoint.fromCellId(m.cellId);
      cells.push(...Shaper.shapeRing(cell.x, cell.y, 0, 3));
    }

    cells = union(cells);

    if (antiAgro) {
      // then write walls instead of free cells \o/
      for (const cell of cells) {
        const gridPoint = this.grid[cell.x + 1][cell.y + 1];
        if (gridPoint) {
          gridPoint.floor = -1;
          gridPoint.zone = -1;
        }
      }
    }
  }
}
