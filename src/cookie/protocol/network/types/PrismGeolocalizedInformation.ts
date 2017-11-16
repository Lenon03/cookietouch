import PrismInformation from "./PrismInformation";

export default class PrismGeolocalizedInformation {

public worldx: number;
public worldy: number;
public mapid: number;
public prism: PrismInformation;

  constructor(subareaid = 0, allianceid = 0, worldx = 0, worldy = 0, mapid = 0, prism: PrismInformation) {
    this.worldx = worldx;
    this.worldy = worldy;
    this.mapid = mapid;
    this.prism = prism;
  }
}
