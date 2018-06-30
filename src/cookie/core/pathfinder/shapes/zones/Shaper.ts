import MapPoint from "@/core/pathfinder/MapPoint";
import ShaperEntry from "@/core/pathfinder/shapes/zones/ShaperEntry";

export default class Shaper {
  public static shaperMap = new Map<string, ShaperEntry>([
    ["P", null],
    ["A", null],
    ["D", null],
    ["X", new ShaperEntry(Shaper.shapeCross, false, false)],
    ["L", new ShaperEntry(Shaper.shapeLine, true, false)],
    ["T", new ShaperEntry(Shaper.shapePerpendicular, true, false)],
    ["C", new ShaperEntry(Shaper.shapeRing, false, false)],
    ["O", new ShaperEntry(Shaper.shapeCirclePerimeter, false, false)],
    ["+", new ShaperEntry(Shaper.shapeStar, false, false)],
    ["G", new ShaperEntry(Shaper.shapeSquare, false, false)],
    ["V", new ShaperEntry(Shaper.shapeCone, true, false)],
    ["W", new ShaperEntry(Shaper.shapeCones, false, false)],
    ["/", new ShaperEntry(Shaper.shapeLine, true, false)],
    ["-", new ShaperEntry(Shaper.shapePerpendicular, true, false)],
    ["U", new ShaperEntry(Shaper.shapeHalfcircle, true, false)],
    ["Q", new ShaperEntry(Shaper.shapeCross, false, true)],
    ["#", new ShaperEntry(Shaper.shapeStar, false, true)],
    ["*", new ShaperEntry(Shaper.shapeCrossAndStar, false, false)],
    ["I", new ShaperEntry(Shaper.shapeInvertedCircle, false, false)]
  ]);

  public static shapeRing(
    x: number,
    y: number,
    radiusMin: number,
    radiusMax: number,
    dirX: number = 0,
    dirY: number = 0
  ): MapPoint[] {
    const range = [];
    if (radiusMin === 0) {
      range.push(MapPoint.fromCoords(x, y));
    }
    for (
      let radius = radiusMin === 0 ? 1 : radiusMin;
      radius <= radiusMax;
      radius++
    ) {
      for (let i = 0; i < radius; i++) {
        const r = radius - i;
        range.push(MapPoint.fromCoords(x + i, y - r));
        range.push(MapPoint.fromCoords(x + r, y + i));
        range.push(MapPoint.fromCoords(x - i, y + r));
        range.push(MapPoint.fromCoords(x - r, y - i));
      }
    }
    return range.filter(c => c !== null);
  }

  public static shapeCross(
    x: number,
    y: number,
    radiusMin: number,
    radiusMax: number,
    dirX: number = 0,
    dirY: number = 0
  ): MapPoint[] {
    const range = [];
    if (radiusMin === 0) {
      range.push(MapPoint.fromCoords(x, y));
    }
    for (let i = radiusMin === 0 ? 1 : radiusMin; i <= radiusMax; i++) {
      range.push(MapPoint.fromCoords(x - i, y));
      range.push(MapPoint.fromCoords(x + i, y));
      range.push(MapPoint.fromCoords(x, y - i));
      range.push(MapPoint.fromCoords(x, y + i));
    }
    return range.filter(c => c !== null);
  }

  public static shapeStar(
    x: number,
    y: number,
    radiusMin: number,
    radiusMax: number,
    dirX: number = 0,
    dirY: number = 0
  ): MapPoint[] {
    const range = [];
    if (radiusMin === 0) {
      range.push(MapPoint.fromCoords(x, y));
    }
    for (let i = radiusMin === 0 ? 1 : radiusMin; i <= radiusMax; i++) {
      range.push(MapPoint.fromCoords(x - i, y - i));
      range.push(MapPoint.fromCoords(x - i, y + i));
      range.push(MapPoint.fromCoords(x + i, y - i));
      range.push(MapPoint.fromCoords(x + i, y + i));
    }
    return range.filter(c => c !== null);
  }

  public static shapeCrossAndStar(
    x: number,
    y: number,
    radiusMin: number,
    radiusMax: number,
    dirX: number = 0,
    dirY: number = 0
  ): MapPoint[] {
    const range = [];
    if (radiusMin === 0) {
      range.push(MapPoint.fromCoords(x, y));
    }
    for (let i = radiusMin === 0 ? 1 : radiusMin; i <= radiusMax; i++) {
      range.push(MapPoint.fromCoords(x - i, y));
      range.push(MapPoint.fromCoords(x + i, y));
      range.push(MapPoint.fromCoords(x, y - i));
      range.push(MapPoint.fromCoords(x, y + i));

      range.push(MapPoint.fromCoords(x - i, y - i));
      range.push(MapPoint.fromCoords(x - i, y + i));
      range.push(MapPoint.fromCoords(x + i, y - i));
      range.push(MapPoint.fromCoords(x + i, y + i));
    }
    return range.filter(c => c !== null);
  }

  public static shapeSquare(
    x: number,
    y: number,
    radiusMin: number,
    radiusMax: number,
    dirX: number = 0,
    dirY: number = 0
  ): MapPoint[] {
    const range = [];
    if (radiusMin === 0) {
      range.push(MapPoint.fromCoords(x, y));
    }
    for (
      let radius = radiusMin === 0 ? 1 : radiusMin;
      radius <= radiusMax;
      radius++
    ) {
      range.push(MapPoint.fromCoords(x - radius, y));
      range.push(MapPoint.fromCoords(x + radius, y));
      range.push(MapPoint.fromCoords(x, y - radius));
      range.push(MapPoint.fromCoords(x, y + radius));

      range.push(MapPoint.fromCoords(x - radius, y - radius));
      range.push(MapPoint.fromCoords(x - radius, y + radius));
      range.push(MapPoint.fromCoords(x + radius, y - radius));
      range.push(MapPoint.fromCoords(x + radius, y + radius));

      for (let i = 1; i < radius; i++) {
        range.push(MapPoint.fromCoords(x + radius, y + i));
        range.push(MapPoint.fromCoords(x + radius, y - i));
        range.push(MapPoint.fromCoords(x - radius, y + i));
        range.push(MapPoint.fromCoords(x - radius, y - i));
        range.push(MapPoint.fromCoords(x + i, y + radius));
        range.push(MapPoint.fromCoords(x - i, y + radius));
        range.push(MapPoint.fromCoords(x + i, y - radius));
        range.push(MapPoint.fromCoords(x - i, y - radius));
      }
    }
    return range.filter(c => c !== null);
  }

  public static shapeCone(
    x: number,
    y: number,
    radiusMin: number,
    radiusMax: number,
    dirX: number = 0,
    dirY: number = 0
  ): MapPoint[] {
    const range = [];
    for (let radius = radiusMin; radius <= radiusMax; radius++) {
      const xx = x + radius * dirX;
      const yy = y + radius * dirY;
      range.push(MapPoint.fromCoords(xx, yy));

      for (let i = 1; i <= radius; i++) {
        range.push(MapPoint.fromCoords(xx + i * dirY, yy - i * dirX));
        range.push(MapPoint.fromCoords(xx - i * dirY, yy + i * dirX));
      }
    }
    return range.filter(c => c !== null);
  }

  public static shapeHalfcircle(
    x: number,
    y: number,
    radiusMin: number,
    radiusMax: number,
    dirX: number = 0,
    dirY: number = 0
  ): MapPoint[] {
    const range = [];
    if (radiusMin === 0) {
      range.push(MapPoint.fromCoords(x, y));
    }
    for (
      let radius = radiusMin === 0 ? 1 : radiusMin;
      radius <= radiusMax;
      radius++
    ) {
      const xx = x - radius * dirX;
      const yy = y - radius * dirY;
      range.push(MapPoint.fromCoords(xx + radius * dirY, yy - radius * dirX));
      range.push(MapPoint.fromCoords(xx - radius * dirY, yy + radius * dirX));
    }
    return range.filter(c => c !== null);
  }

  public static shapeCones(
    x: number,
    y: number,
    radiusMin: number,
    radiusMax: number,
    dirX: number = 0,
    dirY: number = 0
  ): MapPoint[] {
    const range = [];
    for (
      let radius = radiusMin === 0 ? 1 : radiusMin;
      radius <= radiusMax;
      radius++
    ) {
      range.push(MapPoint.fromCoords(x - radius, y));
      range.push(MapPoint.fromCoords(x + radius, y));
      range.push(MapPoint.fromCoords(x, y - radius));
      range.push(MapPoint.fromCoords(x, y + radius));

      for (let i = 1; i < radius; i++) {
        range.push(MapPoint.fromCoords(x + radius, y + i));
        range.push(MapPoint.fromCoords(x + radius, y - i));
        range.push(MapPoint.fromCoords(x - radius, y + i));
        range.push(MapPoint.fromCoords(x - radius, y - i));
        range.push(MapPoint.fromCoords(x + i, y + radius));
        range.push(MapPoint.fromCoords(x - i, y + radius));
        range.push(MapPoint.fromCoords(x + i, y - radius));
        range.push(MapPoint.fromCoords(x - i, y - radius));
      }
    }
    return range.filter(c => c !== null);
  }

  public static shapeLine(
    x: number,
    y: number,
    radiusMin: number,
    radiusMax: number,
    dirX: number = 0,
    dirY: number = 0
  ): MapPoint[] {
    const range = [];
    for (let i = radiusMin; i <= radiusMax; i++) {
      range.push(MapPoint.fromCoords(x + dirX * i, y + dirY * i));
    }
    return range.filter(c => c !== null);
  }

  public static shapeCirclePerimeter(
    x: number,
    y: number,
    radiusMin: number,
    radiusMax: number,
    dirX: number = 0,
    dirY: number = 0
  ): MapPoint[] {
    return this.shapeRing(x, y, radiusMax, radiusMax);
  }

  public static shapeInvertedCircle(
    x: number,
    y: number,
    radiusMin: number,
    radiusMax: number,
    dirX: number = 0,
    dirY: number = 0
  ): MapPoint[] {
    return this.shapeRing(x, y, radiusMax, 39);
  }

  public static shapePerpendicular(
    x: number,
    y: number,
    radiusMin: number,
    radiusMax: number,
    dirX: number = 0,
    dirY: number = 0
  ): MapPoint[] {
    const range = [];
    if (radiusMin === 0) {
      range.push(MapPoint.fromCoords(x, y));
    }
    for (let i = radiusMin === 0 ? 1 : radiusMin; i <= radiusMax; i++) {
      range.push(MapPoint.fromCoords(x + dirY * i, y - dirX * i));
      range.push(MapPoint.fromCoords(x - dirY * i, y + dirX * i));
    }
    return range.filter(c => c !== null);
  }
}
