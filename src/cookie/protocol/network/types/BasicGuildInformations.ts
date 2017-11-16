export default class BasicGuildInformations {

  public guildid: number;
  public guildname: string;

  constructor(guildid = 0, guildname = "") {
    this.guildid = guildid;
    this.guildname = guildname;
  }
}
