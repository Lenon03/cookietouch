import GuildVersatileInformations from "./GuildVersatileInformations";

export default class GuildInAllianceVersatileInformations extends GuildVersatileInformations {
  public allianceId: number;

  constructor(guildId = 0, leaderId = 0, guildLevel = 0, nbMembers = 0, allianceId = 0) {
    super(guildId, leaderId, guildLevel, nbMembers);
    this.allianceId = allianceId;
  }
}
