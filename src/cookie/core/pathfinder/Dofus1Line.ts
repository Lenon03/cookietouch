import Map from "@protocol/data/map";
import MapPoint from "./MapPoint";

export default class Dofus1Line {
  public static isLineObstructed(map: Map, sourceCellId: number, targetCellId: number,
                                 occupiedCells: number[], diagonal = false): boolean {
    const sourceMp = MapPoint.fromCellId(sourceCellId);
    const targetMp = MapPoint.fromCellId(targetCellId);

    let x = sourceMp.x + 0.5;
    let y = sourceMp.y + 0.5;
    const targetX = targetMp.x + 0.5;
    const targetY = targetMp.y + 0.5;
    let lastX = sourceMp.x;
    let lastY = sourceMp.y;

    let padX = 0;
    let padY = 0;
    let steps = 0;
    let cas = 0;

    if (Math.abs(x - targetX) === Math.abs(y - targetY)) {
      steps = Math.abs(x - targetX);
      padX = targetX > x ? 1 : -1;
      padY = targetY > y ? 1 : -1;
      cas = 1;
    } else if (Math.abs(x - targetX) > Math.abs(y - targetY)) {
      steps = Math.abs(x - targetX);
      padX = targetX > x ? 1 : -1;
      padY = (targetY - y) / steps;
      padY = Math.ceil(padY) / 100;
      cas = 2;
    } else {
      steps = Math.abs(y - targetY);
      padX = (targetX - x) / steps;
      padX = padX * 100;
      padX = Math.ceil(padX) / 100;
      padY = targetY > y ? 1 : -1;
      cas = 3;
    }

    const errorSup = Math.round(Math.floor(3 + steps / 2));
    const errorInf = Math.round(Math.floor(97 - steps / 2));

    for (let i = 0; i < steps; i++) {
      let cellX = 0;
      let cellY = 0;
      const xPadX = x + padX;
      const yPadY = y + padY;

      switch (cas) {
        case 2: {
          const beforeY = Math.ceil(y * 100 + padY * 50) / 100;
          const afterY = Math.floor(y * 100 + padY * 150) / 100;
          const diffBeforeCenterY = Math.floor(Math.abs(Math.floor(beforeY) * 100 - beforeY * 100)) / 100;
          const diffCenterAfterY = Math.ceil(Math.abs(Math.ceil(afterY) * 100 - afterY * 100)) / 100;

          cellX = Math.floor(xPadX);

          if (Math.floor(beforeY) === Math.floor(afterY)) {
            cellY = Math.floor(yPadY);
            if (beforeY === cellY && afterY < cellY || afterY === cellY && beforeY < cellY) {
              cellY = Math.ceil(yPadY);
            }
            if (this.isCellObstructed(cellX, cellY, map, occupiedCells, targetCellId, lastX, lastY, diagonal)) {
              return true;
            }
            lastX = cellX;
            lastY = cellY;
          } else if (Math.ceil(beforeY) === Math.ceil(afterY)) {
            cellY = Math.ceil(yPadY);
            if (beforeY === cellY && afterY < cellY || afterY === cellY && beforeY < cellY) {
              cellY = Math.floor(yPadY);
            }
            if (this.isCellObstructed(cellX, cellY, map, occupiedCells, targetCellId, lastX, lastY, diagonal)) {
              return true;
            }
            lastX = cellX;
            lastY = cellY;
          } else if (Math.floor(diffBeforeCenterY * 100) <= errorSup) {
            if (this.isCellObstructed(cellX, Math.floor(beforeY), map, occupiedCells, targetCellId, lastX, lastY, diagonal)) {
              return true;
            }
            lastX = cellX;
            lastY = Math.floor(beforeY);
          } else if (Math.floor(diffCenterAfterY * 100) >= errorInf) {
            if (this.isCellObstructed(cellX, Math.floor(beforeY), map, occupiedCells, targetCellId, lastX, lastY, diagonal)) {
              return true;
            }
            lastX = cellX;
            lastY = Math.floor(beforeY);
          } else {
            if (this.isCellObstructed(cellX, Math.floor(beforeY), map, occupiedCells, targetCellId, lastX, lastY, diagonal)) {
              return true;
            }
            lastX = cellX;
            lastY = Math.floor(beforeY);
            if (this.isCellObstructed(cellX, Math.floor(afterY), map, occupiedCells, targetCellId, lastX, lastY, diagonal)) {
              return true;
            }
            lastY = Math.floor(afterY);
          }
          break;
        }
        case 3: {
          const beforeX = Math.ceil(x * 100 + padX * 50) / 100;
          const afterX = Math.floor(x * 100 + padX * 150) / 100;
          const diffBeforeCenterX = Math.floor(Math.abs(Math.floor(beforeX) * 100 - beforeX * 100)) / 100;
          const diffCenterAfterX = Math.ceil(Math.abs(Math.ceil(afterX) * 100 - afterX * 100)) / 100;

          cellY = Math.floor(yPadY);

          if (Math.floor(beforeX) === Math.floor(afterX)) {
            cellX = Math.floor(xPadX);
            if (beforeX === cellX && afterX < cellX || afterX === cellX && beforeX < cellX) {
              cellX = Math.ceil(xPadX);
            }
            if (this.isCellObstructed(cellX, cellY, map, occupiedCells, targetCellId, lastX, lastY, diagonal)) {
              return true;
            }
            lastX = cellX;
            lastY = cellY;
          } else if (Math.ceil(beforeX) === Math.ceil(afterX)) {
            cellX = Math.ceil(xPadX);
            if (beforeX === cellX && afterX < cellX || afterX === cellX && beforeX < cellX) {
              cellX = Math.floor(xPadX);
            }
            if (this.isCellObstructed(cellX, cellY, map, occupiedCells, targetCellId, lastX, lastY, diagonal)) {
              return true;
            }
            lastX = cellX;
            lastY = cellY;
          } else if (Math.floor(diffBeforeCenterX * 100) <= errorSup) {
            if (this.isCellObstructed(Math.floor(afterX), cellY, map, occupiedCells, targetCellId, lastX, lastY, diagonal)) {
              return true;
            }
            lastX = Math.floor(afterX);
            lastY = cellY;
          } else if (Math.floor(diffCenterAfterX * 100) >= errorInf) {
            if (this.isCellObstructed(Math.floor(beforeX), cellY, map, occupiedCells, targetCellId, lastX, lastY, diagonal)) {
              return true;
            }
            lastX = Math.floor(beforeX);
            lastY = cellY;
          } else {
            if (this.isCellObstructed(Math.floor(beforeX), cellY, map, occupiedCells, targetCellId, lastX, lastY, diagonal)) {
              return true;
            }
            lastX = Math.floor(beforeX);
            lastY = cellY;
            if (this.isCellObstructed(Math.floor(afterX), cellY, map, occupiedCells, targetCellId, lastX, lastY, diagonal)) {
              return true;
            }
            lastX = Math.floor(afterX);
          }
          break;
        }
        default: /* cas 1 */
        {
          if (this.isCellObstructed(Math.floor(xPadX), Math.floor(yPadY), map, occupiedCells, targetCellId, lastX, lastY, diagonal)) {
            return true;
          }
          lastX = Math.floor(xPadX);
          lastY = Math.floor(yPadY);
          break;
        }
      }

      x = (x * 100 + padX * 100) / 100;
      y = (y * 100 + padY * 100) / 100;
    }

    return false;
  }

  private static isCellObstructed(x: number, y: number, map: Map, occupiedCells: number[],
                                  targetCellId: number, lastX: number, lastY: number, diagonal: boolean): boolean {
    const mp = MapPoint.fromCoords(x, y);

    if (mp === null) {
      return true;
    }

    if (map.cells[mp.cellId].isObstacle() || mp.cellId !== targetCellId && occupiedCells.includes(mp.cellId)) {
      return true;
    }

    if (diagonal) {
      const lmp = MapPoint.fromCoords(lastX, lastY);

      if (lmp === null) {
        return true;
      }

      return !(mp.x === lmp.x + 1 && mp.y === lmp.y + 1 ||
        mp.x === lmp.x + 1 && mp.y === lmp.y - 1 ||
        mp.x === lmp.x - 1 && mp.y === lmp.y + 1 ||
        mp.x === lmp.x - 1 && mp.y === lmp.y - 1
      );
    }

    return true;
  }
}
