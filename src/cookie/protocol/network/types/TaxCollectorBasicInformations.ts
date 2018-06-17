import Type from "./Type";

export default class TaxCollectorBasicInformations extends Type {
  public firstNameId: number;
  public lastNameId: number;
  public worldX: number;
  public worldY: number;
  public mapId: number;
  public subAreaId: number;

  constructor(firstNameId = 0, lastNameId = 0, worldX = 0, worldY = 0, mapId = 0, subAreaId = 0) {
    super();
    this.firstNameId = firstNameId;
    this.lastNameId = lastNameId;
    this.worldX = worldX;
    this.worldY = worldY;
    this.mapId = mapId;
    this.subAreaId = subAreaId;
  }
}
