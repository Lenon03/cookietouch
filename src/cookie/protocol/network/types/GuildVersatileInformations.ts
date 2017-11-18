export default class GuildVersatileInformations {
  public guildId: number;
  public leaderId: number;
  public guildLevel: number;
  public nbMembers: number;
  constructor(guildId = 0, leaderId = 0, guildLevel = 0, nbMembers = 0) {

    this.guildId = guildId;
    this.leaderId = leaderId;
    this.guildLevel = guildLevel;
    this.nbMembers = nbMembers;

  }
}
