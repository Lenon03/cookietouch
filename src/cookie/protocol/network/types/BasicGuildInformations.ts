export default class BasicGuildInformations {

  public guildId: number;
  public guildName: string;

  constructor(guildId = 0, guildName = "") {
    this.guildId = guildId;
    this.guildName = guildName;
  }
}
