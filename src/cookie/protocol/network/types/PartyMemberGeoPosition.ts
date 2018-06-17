import Type from "./Type";

export default class PartyMemberGeoPosition extends Type {
  public memberId: number;
  public worldX: number;
  public worldY: number;
  public mapId: number;
  public subAreaId: number;

  constructor(memberId = 0, worldX = 0, worldY = 0, mapId = 0, subAreaId = 0) {
    super();
    this.memberId = memberId;
    this.worldX = worldX;
    this.worldY = worldY;
    this.mapId = mapId;
    this.subAreaId = subAreaId;
  }
}
