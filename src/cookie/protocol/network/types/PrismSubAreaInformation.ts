import Type from "@/protocol/network/types/Type";

export default class PrismSubAreaInformation extends Type {
  public worldX: number;
  public worldY: number;
  public mapId: number;
  public subAreaId: number;
  public alignment: number;
  public isInFight: boolean;
  public isFightable: boolean;

  constructor(
    worldX = 0,
    worldY = 0,
    mapId = 0,
    subAreaId = 0,
    alignment = 0,
    isInFight = false,
    isFightable = false
  ) {
    super();
    this.worldX = worldX;
    this.worldY = worldY;
    this.mapId = mapId;
    this.subAreaId = subAreaId;
    this.alignment = alignment;
    this.isInFight = isInFight;
    this.isFightable = isFightable;
  }
}
