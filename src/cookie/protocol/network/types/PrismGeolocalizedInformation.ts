import PrismInformation from "./PrismInformation";

export default class PrismGeolocalizedInformation {

public worldX: number;
public worldY: number;
public mapId: number;
public prism: PrismInformation;

  constructor(subareaid = 0, allianceid = 0, worldX = 0, worldY = 0, mapId = 0, prism: PrismInformation) {
    this.worldX = worldX;
    this.worldY = worldY;
    this.mapId = mapId;
    this.prism = prism;
  }
}
