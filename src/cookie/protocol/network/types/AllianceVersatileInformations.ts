export default class AllianceVersatileInformations {

  public allianceDd: number;
  public nbGuilds: number;
  public nbMembers: number;
  public nbSubArea: number;

  constructor(allianceDd = 0, nbGuilds = 0, nbMembers = 0, nbSubArea = 0) {
    this.allianceDd = allianceDd;
    this.nbGuilds = nbGuilds;
    this.nbMembers = nbMembers;
    this.nbSubArea = nbSubArea;
  }
}
