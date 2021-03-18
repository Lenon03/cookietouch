import MapPoint from "@/core/pathfinder/MapPoint";
import Shaper from "@/core/pathfinder/shapes/zones/Shaper";
import Zone from "@/core/pathfinder/shapes/zones/Zone";
import ZonesUtility from "@/core/pathfinder/shapes/zones/ZonesUtility";
import SpellLevels from "@/protocol/data/classes/SpellLevels";
import Map from "@/protocol/data/map";
import { notEmpty, union } from "@/utils/Arrays";

export default class SpellShapes {
  public static getSpellRange(
    sourceCellId: number,
    spellLevel: SpellLevels,
    additionnalRange = 0
  ): MapPoint[] {
    const mp = MapPoint.fromCellId(sourceCellId);
    if (!mp) {
      return [];
    }
    const range =
      spellLevel.range + (spellLevel.rangeCanBeBoosted ? additionnalRange : 0);

    if (spellLevel.castInLine && spellLevel.castInDiagonal) {
      return union(
        Shaper.shapeCross(mp.x, mp.y, spellLevel.minRange, range).concat(
          Shaper.shapeStar(mp.x, mp.y, spellLevel.minRange, range)
        )
      );
    }

    if (spellLevel.castInDiagonal) {
      return Shaper.shapeStar(mp.x, mp.y, spellLevel.minRange, range);
    }

    if (spellLevel.castInLine) {
      return Shaper.shapeCross(mp.x, mp.y, spellLevel.minRange, range);
    }

    return Shaper.shapeRing(mp.x, mp.y, spellLevel.minRange, range);
  }

  public static getSpellEffectZone(
    map: Map,
    spellLevel: SpellLevels,
    casterCellId: number,
    targetCellId: number
  ): MapPoint[] {
    const zone: Array<MapPoint | null> = [];

    const effect = this.getZoneEffect(spellLevel);
    const shaper = Shaper.shaperMap.get(effect.zoneShape);

    if (!shaper) {
      zone.push(MapPoint.fromCellId(targetCellId));
      return zone.filter(notEmpty);
    }

    const targetCoords = MapPoint.fromCellId(targetCellId);
    if (!targetCoords) {
      return zone.filter(notEmpty);
    }
    let dirX = 0;
    let dirY = 0;

    if (shaper.hasDirection) {
      const casterCoords = MapPoint.fromCellId(casterCellId);
      if (!casterCoords) {
        return zone.filter(notEmpty);
      }
      dirX =
        targetCoords.x === casterCoords.x
          ? 0
          : targetCoords.x > casterCoords.x
            ? 1
            : -1;
      dirY =
        targetCoords.y === casterCoords.y
          ? 0
          : targetCoords.y > casterCoords.y
            ? 1
            : -1;
    }

    const radiusMin = shaper.withoutCenter
      ? effect.zoneMinSize === 0
        ? 1
        : effect.zoneMinSize
      : effect.zoneMinSize;
    const rangeCoords = shaper.fn(
      targetCoords.x,
      targetCoords.y,
      radiusMin,
      effect.zoneSize,
      dirX,
      dirY
    );

    for (const mp of rangeCoords) {
      if (map.cells[mp.cellId].isWalkable(true)) {
        zone.push(mp);
      }
    }

    return zone.filter(notEmpty);
  }

  private static getZoneEffect(spellLevel: SpellLevels): Zone {
    let zoneEffect: Zone | null = null;
    let ray = 63;

    for (const e of spellLevel.effects) {
      if (e.rawZone !== undefined) {
        const ze = ZonesUtility.parseZone(e.rawZone);
        if (ze.zoneSize > 0 && ze.zoneSize < ray) {
          ray = ze.zoneSize;
          zoneEffect = ze;
        }
      }
    }
    return zoneEffect === null ? ZonesUtility.parseZone("P") : zoneEffect;
  }
}
