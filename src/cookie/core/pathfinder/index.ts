import Map from "@protocol/data/map";
import Cell from "@protocol/data/map/Cell";
import CellPath from "./CellPath";
import CellPathData from "./CellPathData";

export default class PathFinder {

  public static Init() {
    this.constructMapPoints();

    for (let i = 0; i < this.WIDTH; i += 1) {
      const row = [];
      for (let j = 0; j < this.HEIGHT; j += 1) {
        row[j] = new CellPathData(i, j);
      }
      this.grid[i] = row;
    }
  }

  public static getMapPoint(cellId: number) {
    const row = cellId % 14 - ~~(cellId / 28);
    const x = row + 19;
    const y = row + ~~(cellId / 14);
    return { x, y };
  }

  public static getCellId(x: number, y: number): number {
    return this.mapPointToCellId[x + "_" + y];
  }

  public static fillPathGrid(map: Map) {
    // TODO: add whether a map uses the old system onto the map data
    // when it is generated on the server side
    // oldMovementSystem = map.usesOldMovementSystem;
    this.firstCellZone = map.cells[0].z || 0;
    this.oldMovementSystem = true;

    for (let i = 0; i < this.WIDTH; i += 1) {
      const row = this.grid[i];
      for (let j = 0; j < this.HEIGHT; j += 1) {
        const cellId = this.getCellId(i - 1, j - 1);
        const cellPath = row[j];
        const cell = map.cells[cellId];
        this.updateCellPath(cell, cellPath);
      }
    }
  }

  /**
   * Finds the optimal path between 2 points on the map
   *
   * @param {number} source - cellId of source path
   * @param {number} target - cellId of target path
   * @param {number[]} occupiedCells - An object containing the cells that are occupied
   * @param {Boolean} [allowDiagonals] - Can path contain diagonal movements. Default is true.
   *
   * @return {number[]} An array of cellId for the optimal path to destination or the path
   * that gets closer to destination if none.
   *
   */
  public static getPath(source: number, target: number, occupiedCells: number[] = [],
                        allowDiagonals: boolean = true, stopNextToTarget: boolean = false): number[] {
    let c;
    let candidate;
    console.log("[pathfinding] Calculating path for " + source + " to " + target);

    const srcPos = this.getMapPoint(source); // source index
    const dstPos = this.getMapPoint(target); // destination index

    const si = srcPos.x + 1; // source i
    const sj = srcPos.y + 1; // source j
    console.log("[pathfinding] I : " + si + " , J : " + sj);
    const srcCell = this.grid[si][sj];
    if (srcCell.zone === -1) {
      // Searching for accessible cell around source
      let bestFit = null;
      let bestDist = Infinity;
      let bestFloorDiff = Infinity;
      for (let i = -1; i <= 1; i += 1) {
        for (let j = -1; j <= 1; j += 1) {
          if (i === 0 && j === 0) {
            continue;
          }

          const cell = this.grid[si + i][sj + j];
          if (cell.zone === -1) {
            continue;
          }

          const floorDiff = Math.abs(cell.f - srcCell.f);
          const dist = Math.abs(i) + Math.abs(j);
          if (bestFit === null || floorDiff < bestFloorDiff || (floorDiff <= bestFloorDiff && dist < bestDist)) {
            bestFit = cell;
            bestDist = dist;
            bestFloorDiff = floorDiff;
          }
        }
      }

      if (bestFit !== null) {
        console.log("[pathfinding] Selected : " + this.getCellId(bestFit.i - 1, bestFit.j - 1));
        return [source, this.getCellId(bestFit.i - 1, bestFit.j - 1)];
      }

      console.error(new Error("[pathFinder.getPath] Player is stuck in " + si + "/" + sj));
      return [source];
    }

    const di = dstPos.x + 1; // destination i
    const dj = dstPos.y + 1; // destination j

    // marking cells as occupied
    let cellPos;
    for (const cellId of occupiedCells) {
      if (cellId !== target) {
        cellPos = this.getMapPoint(cellId);
        this.grid[cellPos.x + 1][cellPos.y + 1].weight += this.OCCUPIED_CELL_WEIGHT;
      }
    }

    let candidates: CellPath[] = [];
    const selections: CellPath[] = [];

    // First cell in the path
    const distSrcDst = Math.sqrt((si - di) * (si - di) + (sj - dj) * (sj - dj));
    let selection = new CellPath(si, sj, 0, distSrcDst, null);

    console.log("[pathfinding] Select : " + JSON.stringify(selection) + ", dist : " + distSrcDst);
    // Adding cells to path until destination has been reached
    let reachingPath = null;
    let closestPath = selection;
    while (selection.i !== di || selection.j !== dj) {
      this.addCandidates(selection, di, dj, candidates, allowDiagonals);

      // Looking for candidate with the smallest additional length to path
      // in O(number of candidates)
      const n = candidates.length;
      if (n === 0) {
        // No possible path
        // returning the closest path to destination
        selection = closestPath;
        break;
      }

      let minPotentialWeight = Infinity;
      let selectionIndex = 0;
      for (c = 0; c < n; c += 1) {
        candidate = candidates[c];
        if (candidate.w + candidate.d < minPotentialWeight) {
          selection = candidate;
          minPotentialWeight = candidate.w + candidate.d;
          selectionIndex = c;
        }
      }
      console.log("[pathfinding] Pushed cell : " + selection);
      selections.push(selection);
      candidates.splice(selectionIndex, 1);

      // If stopNextToTarget
      // then when reaching a distance of less than Math.sqrt(2) the destination is considered as reached
      // (the threshold has to be bigger than sqrt(2) but smaller than 2, to be safe we use the value 1.5)
      if (selection.d === 0 || (stopNextToTarget && selection.d < 1.5)) {
        // Selected path reached destination
        if (reachingPath === null || selection.w < reachingPath.w) {
          reachingPath = selection;
          closestPath = selection;

          // Clearing candidates dominated by current solution to speed up the algorithm
          const trimmedCandidates: any[] = [];
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
          // 'selection' is the new closest path to destination
          closestPath = selection;
        }
      }
    }

    // Removing candidate reference in each cell in selections and active candidates
    for (c = 0; c < candidates.length; c += 1) {
      candidate = candidates[c];
      this.grid[candidate.i][candidate.j].candidateRef = null;
    }

    for (const sel of selections) {
      this.grid[sel.i][sel.j].candidateRef = null;
    }

    // Marking cells as unoccupied
    for (const cellId of occupiedCells) {
      cellPos = this.getMapPoint(cellId);
      this.grid[cellPos.x + 1][cellPos.y + 1].weight -= this.OCCUPIED_CELL_WEIGHT;
    }

    const shortestPath: number[] = [];
    while (closestPath !== null) {
      shortestPath.unshift(this.getCellId(closestPath.i - 1, closestPath.j - 1));
      closestPath = closestPath.path;
    }

    return shortestPath;
  }

  public static compressPath(path: number[]): number[] {
    if (path.length === 1) {
      return path;
    } // si on est deja sur la cell pas besoin de calculer
    const compressedPath = [];
    let prevCellId = path[0];
    let prevDirection = -1;

    let prevX;

    let prevY;

    for (let i = 0; i < path.length; i++) {
      const cellId = path[i];

      let direction;
      const coord = this.getMapPoint(cellId);

      // get direction
      if (i === 0) {
        direction = -1;
      } else {
        if (coord.y === prevY) {
          // move horizontaly
          direction = coord.x > prevX
            ? 7
            : 3;
        } else if (coord.x === prevX) {
          // move verticaly
          direction = coord.y > prevY
            ? 1
            : 5;
        } else {
          // move in diagonal
          if (coord.x > prevX) {
            direction = coord.y > prevY
              ? 0
              : 6;
          } else {
            direction = coord.y > prevY
              ? 2
              : 4;
          }
        }
      }

      if (direction !== prevDirection) {
        console.log("prevCellId 1", prevCellId);
        console.log("direction 1", direction);
        console.log("ERROR 1", prevCellId + (direction << 12));
        compressedPath.push(prevCellId + (direction << 12));
        prevDirection = direction;
      }

      prevCellId = cellId;
      prevX = coord.x;
      prevY = coord.y;
    }

    console.log("prevCellId 2", prevCellId);
    console.log("prevDirection 2", prevDirection);
    console.log("ERROR 2", prevCellId + (prevDirection << 12));
    compressedPath.push(prevCellId + (prevDirection << 12));

    return compressedPath;
  }

  /**
   * debug function : output an ascii representation of the map in the console
   *
   * @param  {number[]} path - Atouin path. Each number in the array is a cellId (a number in the range [0..559])
   * @return {string}        - Representation of the path on an Atouin Map
   */
  public static logPath(path: number[]): string {
    path = path || [];
    // construct matrix from map
    const grid: any[string] = [];
    let x;
    let y;
    for (x = 0; x < 33; x += 1) {
      grid.push([]);
      for (y = 0; y < 34; y += 1) {
        if (this.getCellId(x, y) === undefined) {
          grid[x][y] = "    ";
        } else {
          grid[x][y] = "[  ]";
        }
      }
    }
    for (let i = 0, len = path.length; i < len; i += 1) {
      const cellId = path[i];
      const coord = this.getMapPoint(cellId);
      const b = (i < 10) ? "0" : "";
      grid[coord.x][coord.y] = "[" + b + i + "]";
    }
    let text = "";
    for (y = 0; y < 34; y += 1) {
      for (x = 0; x < 33; x += 1) {
        text += grid[x][y];
      }
      text += "\n";
    }
    return text;
  }

  /**
   * checkPath - check if path is valid
   *
   * @param  {number[]}      path - Atouin path. Each number in the array is a cellId (a number in the range [0..559])
   * @return {boolean}            - function return true if all cellId are consecutive.
   */
  public static checkPath(path: number[]): boolean {
    if (!Array.isArray(path) || path.length < 2) { return false; }
    let previous = this.getMapPoint(path[0]);
    for (let i = 1, len = path.length; i < len; i += 1) {
      const cellId = path[i];
      const coord = this.getMapPoint(cellId);
      if (Math.abs(previous.x - coord.x) > 1) { return false; }
      if (Math.abs(previous.y - coord.y) > 1) { return false; }
      previous = coord;
    }
    return true;
  }

  /**
   * expandPath - expand path if there is hole in it (used for monsters movements)
   *
   * @param {number[]} path - array of cellId
   *
   * @return {Array} an array of cellId.
   */
  public static expandPath(path: number[]): number[] {
    if (!Array.isArray(path)) { return []; }
    if (path.length < 2) { return path; }
    const resultPath = [];
    resultPath.push(path[0]);
    let previous = this.getMapPoint(path[0]);
    for (let i = 1, len = path.length; i < len; i += 1) {
      const cellId = path[i];
      const coord = this.getMapPoint(cellId);
      let incrX;
      let incrY;
      // TODO: diagonal case ?
      if (Math.abs(coord.x - previous.x) > 1) {
        incrX = (coord.x > previous.x) ? 1 : -1;
        previous.x += incrX;
        while (previous.x !== coord.x) {
          resultPath.push(this.getCellId(previous.x, previous.y));
          previous.x += incrX;
        }
      }
      if (Math.abs(coord.y - previous.y) > 1) {
        incrY = (coord.y > previous.y) ? 1 : -1;
        previous.y += incrY;
        while (previous.y !== coord.y) {
          resultPath.push(this.getCellId(previous.x, previous.y));
          previous.y += incrY;
        }
      }
      previous = coord;
      resultPath.push(cellId);
    }
    return resultPath;
  }

  public static normalizePath(path: number[]): number[] {
    if (this.checkPath(path)) { return path; }
    return this.expandPath(path);
  }

  // TODO: use aggressive flag of monsters to add this weight to cells
  // private AGGRESSION_CELL_WEIGHT = 20;
  private static OCCUPIED_CELL_WEIGHT = 10;
  // Corresponds to 11 * 43 / 40 = 11.825
  // Where 11 is the elevation tolerance in the original dofus game
  // Where 40 is the height of a cell in the original dofus game (with respect to DataMapProvider.as file)
  // Where 43 is the height of a cell in our dofus version
  private static ELEVATION_TOLERANCE = 11.825;
  private static WIDTH = 33 + 2;
  private static HEIGHT = 34 + 2;
  private static mapPointToCellId: any[any] = [];
  private static oldMovementSystem: boolean;
  private static firstCellZone: number;
  private static grid: CellPathData[][] = [];

  private static constructMapPoints() {
    for (let cellId = 0; cellId < 560; cellId++) {
      const coord = this.getMapPoint(cellId);
      this.mapPointToCellId[coord.x + "_" + coord.y] = cellId;
    }
  }

  private static updateCellPath(cell: Cell, cellPath: CellPathData) {
    if ((cell !== undefined) && (cell.l & 1)) {
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

  private static addCandidate(c: CellPathData, w: number, di: number,
                              dj: number, candidates: CellPath[], path: CellPath) {
    const i = c.i;
    const j = c.j;

    // The total weight of the candidate is the weight of previous path
    // plus its weight (calculated based on occupancy and speed factor)
    const distanceToDestination = Math.sqrt((di - i) * (di - i) + (dj - j) * (dj - j));
    w = w / c.speed + c.weight;

    if (c.candidateRef === null) {
      const candidateRef = new CellPath(i, j, path.w + w, distanceToDestination, path);
      candidates.push(candidateRef);
      c.candidateRef = candidateRef;
    } else {
      const currentWeight = c.candidateRef.w;
      const newWeight = path.w + w;
      if (newWeight < currentWeight) {
        c.candidateRef.w = newWeight;
        c.candidateRef.path = path;
      }
    }
  }

  private static addCandidates(path: CellPath, di: number, dj: number,
                               candidates: CellPath[], allowDiagonals: boolean) {
    const i = path.i;
    const j = path.j;
    const c = this.grid[i][j];

    // Searching whether adjacent cells can be candidates to lengthen the path

    // Adjacent cells
    const c01 = this.grid[i - 1][j];
    const c10 = this.grid[i][j - 1];
    const c12 = this.grid[i][j + 1];
    const c21 = this.grid[i + 1][j];

    // weight of path in straight line = 1
    const weightStraight = 1;

    if (this.areCommunicating(c, c01)) { this.addCandidate(c01, weightStraight, di, dj, candidates, path); }
    if (this.areCommunicating(c, c21)) { this.addCandidate(c21, weightStraight, di, dj, candidates, path); }
    if (this.areCommunicating(c, c10)) { this.addCandidate(c10, weightStraight, di, dj, candidates, path); }
    if (this.areCommunicating(c, c12)) { this.addCandidate(c12, weightStraight, di, dj, candidates, path); }

    // Searching whether diagonally adjacent cells can be candidates to lengthen the path

    // Diagonally adjacent cells
    const c00 = this.grid[i - 1][j - 1];
    const c02 = this.grid[i - 1][j + 1];
    const c20 = this.grid[i + 1][j - 1];
    const c22 = this.grid[i + 1][j + 1];

    // weight of path in diagonal = Math.sqrt(2)
    const weightDiagonal = Math.sqrt(2);

    if (allowDiagonals) {
      if (this.canMoveDiagonallyTo(c, c00, c01, c10)) {
        this.addCandidate(c00, weightDiagonal, di, dj, candidates, path);
      }
      if (this.canMoveDiagonallyTo(c, c20, c21, c10)) {
        this.addCandidate(c20, weightDiagonal, di, dj, candidates, path);
      }
      if (this.canMoveDiagonallyTo(c, c02, c01, c12)) {
        this.addCandidate(c02, weightDiagonal, di, dj, candidates, path);
      }
      if (this.canMoveDiagonallyTo(c, c22, c21, c12)) {
        this.addCandidate(c22, weightDiagonal, di, dj, candidates, path);
      }
    }
  }

  private static canMoveDiagonallyTo(c1: CellPathData, c2: CellPathData, c3: CellPathData, c4: CellPathData) {
    // Can move between c1 and c2 diagonally only if c1 and c2 are
    // compatible and if c1 is compatible either with c3 or c4
    return this.areCommunicating(c1, c2) && (this.areCommunicating(c1, c3) || this.areCommunicating(c1, c4));
  }

  private static areCommunicating(c1: CellPathData, c2: CellPathData) {
    // Cells are compatible only if they either have the same floor height...
    if (c1.floor === c2.floor) {
      // Same height
      return true;
    }

    // ... or the same zone, different from 0
    // ... or a zone of 0 and a floor difference smaller than ELEVATION_TOLERANCE
    if (c1.zone === c2.zone) {
      return this.oldMovementSystem || (c1.zone !== 0) || (Math.abs(c1.floor - c2.floor) <= this.ELEVATION_TOLERANCE);
    }

    return false;
  }
}
