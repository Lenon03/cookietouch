import { notEmpty } from "@/utils/Arrays";

export default class MapPoint {
  public static cells: MapPoint[];
  public x: number;
  public y: number;
  public cellId: number;

  constructor(cellId: number, x: number, y: number) {
    this.cellId = cellId;
    this.x = x;
    this.y = y;
  }

  public static Init() {
    this.cells = [];

    for (let i = 0; i < 560; i++) {
      const row = (i % 14) - ~~(i / 28);
      const x = row + 19;
      const y = row + ~~(i / 14);
      this.cells.push(new MapPoint(i, x, y));
    }
  }

  public static fromCellId(cellId: number) {
    return this.cells.find(cell => cell.cellId === cellId) || null;
  }

  public static fromCoords(x: number, y: number) {
    const cell = this.cells.find(c => c.x === x && c.y === y);
    return cell === undefined ? null : cell;
  }

  public static getNeighbourCells(
    cellId: number,
    allowDiagonal: boolean
  ): MapPoint[] {
    const neighbours: Array<MapPoint | null> = [];
    const coord = this.fromCellId(cellId);
    if (!coord) {
      return neighbours.filter(notEmpty);
    }

    neighbours.push(this.fromCoords(coord.x, coord.y + 1));
    neighbours.push(this.fromCoords(coord.x - 1, coord.y));
    neighbours.push(this.fromCoords(coord.x, coord.y - 1));
    neighbours.push(this.fromCoords(coord.x + 1, coord.y));

    if (allowDiagonal) {
      neighbours.push(this.fromCoords(coord.x + 1, coord.y + 1));
      neighbours.push(this.fromCoords(coord.x - 1, coord.y + 1));
      neighbours.push(this.fromCoords(coord.x - 1, coord.y - 1));
      neighbours.push(this.fromCoords(coord.x + 1, coord.y - 1));
    }

    return neighbours.filter(notEmpty);
  }

  public distanceTo(destination: MapPoint): number {
    return Math.round(
      Math.sqrt(
        Math.pow(this.x - destination.x, 2) +
          Math.pow(this.y - destination.y, 2)
      )
    );
  }

  public distanceToCell(destination: MapPoint): number {
    return Math.abs(this.x - destination.x) + Math.abs(this.y - destination.y);
  }
}
