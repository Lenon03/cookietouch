import MapPoint from "@/core/pathfinder/MapPoint";

export default class ShaperEntry {
  public hasDirection: boolean;
  public withoutCenter: boolean;
  public fn: (
    x: number,
    y: number,
    radiusMin: number,
    radiusMax: number,
    dirX: number,
    dirY: number
  ) => MapPoint[];

  constructor(
    fn: (
      x: number,
      y: number,
      radiusMin: number,
      radiusMax: number,
      dirX: number,
      dirY: number
    ) => MapPoint[],
    hasDirection: boolean,
    withoutCenter: boolean
  ) {
    this.fn = fn;
    this.hasDirection = hasDirection;
    this.withoutCenter = withoutCenter;
  }
}

/*
var shaperMap = {
  'P': null, // Point: displayed as one cell.
  'A': null, // Whole map: displayed as one cell.
  'D': null, // Chessboard mask: not implemented in original game.
  'X': { fn: shapeCross,           hasDirection: false, withoutCenter: false },
  'L': { fn: shapeLine,            hasDirection: true,  withoutCenter: false },
  'T': { fn: shapePerpendicular,   hasDirection: true,  withoutCenter: false },
  'C': { fn: shapeRing,            hasDirection: false, withoutCenter: false },
  'O': { fn: shapeCirclePerimeter, hasDirection: false, withoutCenter: false },
  '+': { fn: shapeStar,            hasDirection: false, withoutCenter: false },
  'G': { fn: shapeSquare,          hasDirection: false, withoutCenter: false },
  'V': { fn: shapeCone,            hasDirection: true,  withoutCenter: false },
  'W': { fn: shapeCones,           hasDirection: false, withoutCenter: false },
  '/': { fn: shapeLine,            hasDirection: true,  withoutCenter: false },
  '-': { fn: shapePerpendicular,   hasDirection: true,  withoutCenter: false },
  'U': { fn: shapeHalfcircle,      hasDirection: true,  withoutCenter: false },
  'Q': { fn: shapeCross,           hasDirection: false, withoutCenter: true },
  '#': { fn: shapeStar,            hasDirection: false, withoutCenter: true },
  '*': { fn: shapeCrossAndStar,    hasDirection: false, withoutCenter: false },
  'I': { fn: shapeInvertedCircle,  hasDirection: false, withoutCenter: false }
};
*/
