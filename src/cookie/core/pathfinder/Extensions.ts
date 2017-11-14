export interface ICoord {
  x: number;
  y: number;
}

export default class Extensions {
  public static tryGetCoord(cellId: number, coord: ICoord): boolean {
    coord.x = 0;
    coord.y = 0;

    if (cellId < 0 || cellId > 560) {
      return false;
    }

    coord.x = cellId % 14;
    coord.y = Math.floor(cellId / 14);

    return true;
  }
}
