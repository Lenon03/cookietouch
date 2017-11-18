import GuildInformations from "./GuildInformations";
export default class TaxCollectorStaticInformations {
  public firstNameId: number;
  public lastNameId: number;
  public guildIdentity: GuildInformations;
  constructor(firstNameId = 0, lastNameId = 0, guildIdentity: GuildInformations = null) {

    this.firstNameId = firstNameId;
    this.lastNameId = lastNameId;
    this.guildIdentity = guildIdentity;

  }
}
