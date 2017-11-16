export default class PrismSubAreaInformation {

  public worldx: number;
  public worldy: number;
  public mapid: number;
  public subareaid: number;
  public alignment: number;
  public isinfight: boolean;
  public isfightable: boolean;

  constructor(worldx = 0, worldy = 0, mapid = 0, subareaid = 0, alignment = 0, isinfight = false, isfightable = false) {
    this.worldx = worldx;
    this.worldy = worldy;
    this.mapid = mapid;
    this.subareaid = subareaid;
    this.alignment = alignment;
    this.isinfight = isinfight;
    this.isfightable = isfightable;
  }
}
