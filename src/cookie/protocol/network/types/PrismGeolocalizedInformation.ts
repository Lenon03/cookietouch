import PrismInformation from "./PrismInformation";
import Type from "./Type";

export default class PrismGeolocalizedInformation extends Type {

public worldX: number;
public worldY: number;
public mapId: number;
public prism: PrismInformation;

  constructor(subareaid = 0, allianceid = 0, worldX = 0, worldY = 0, mapId = 0, prism: PrismInformation) {
    super();
    this.worldX = worldX;
    this.worldY = worldY;
    this.mapId = mapId;
    this.prism = prism;
  }
}
