export default class Zone {
  public zoneShape: string;
  public zoneSize: number;
  public zoneMinSize: number;
  public zoneEfficiencyPercent: number;
  public zoneMaxEfficiency: number;

  constructor(zoneShape: string, zoneSize: number, zoneMinSize: number, zoneEfficiencyPercent: number, zoneMaxEfficiency: number) {
    this.zoneShape = zoneShape;
    this.zoneSize = zoneSize;
    this.zoneMinSize = zoneMinSize;
    this.zoneEfficiencyPercent = zoneEfficiencyPercent;
    this.zoneMaxEfficiency = zoneMaxEfficiency;
  }
}
