export default class AllianceVersatileInformations {

  public allianceid: number;
  public nbguilds: number;
  public nbmembers: number;
  public nbsubarea: number;

  constructor(allianceid = 0, nbguilds = 0, nbmembers = 0, nbsubarea = 0) {
    this.allianceid = allianceid;
    this.nbguilds = nbguilds;
    this.nbmembers = nbmembers;
    this.nbsubarea = nbsubarea;
  }
}
