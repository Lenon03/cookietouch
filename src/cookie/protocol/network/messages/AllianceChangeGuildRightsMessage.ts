import Message from "./Message";

export default class AllianceChangeGuildRightsMessage extends Message {
  public guildId: number;
  public rights: number;

  constructor(guildId = 0, rights = 0) {
    super();
    this.guildId = guildId;
    this.rights = rights;

  }
}
