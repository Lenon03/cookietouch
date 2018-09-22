import PrismInformation from "@/protocol/network/types/PrismInformation";
import Type from "@/protocol/network/types/Type";

export default class PrismGeolocalizedInformation extends Type {
  public worldX: number;
  public worldY: number;
  public mapId: number;
  public prism: PrismInformation;

  constructor(
    subareaid = 0,
    allianceid = 0,
    worldX = 0,
    worldY = 0,
    mapId = 0,
    prism = new PrismInformation()
  ) {
    super();
    this.worldX = worldX;
    this.worldY = worldY;
    this.mapId = mapId;
    this.prism = prism;
  }
}
