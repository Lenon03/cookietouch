export default class AllianceInsiderPrismInformation {

  public lasttimeslotmodificationdate: number;
  public lasttimeslotmodificationauthorguildid: number;
  public lasttimeslotmodificationauthorid: number;
  public lasttimeslotmodificationauthorname: string;
  public hasteleportermodule: boolean;

  constructor(typeid = 0, state = 1, nextvulnerabilitydate = 0, placementdate = 0,
              rewardtokencount = 0, lasttimeslotmodificationdate = 0, lasttimeslotmodificationauthorguildid = 0,
              lasttimeslotmodificationauthorid = 0, lasttimeslotmodificationauthorname = "",
              hasteleportermodule = false) {
    this.lasttimeslotmodificationdate = lasttimeslotmodificationdate;
    this.lasttimeslotmodificationauthorguildid = lasttimeslotmodificationauthorguildid;
    this.lasttimeslotmodificationauthorid = lasttimeslotmodificationauthorid;
    this.lasttimeslotmodificationauthorname = lasttimeslotmodificationauthorname;
    this.hasteleportermodule = hasteleportermodule;
  }
}
