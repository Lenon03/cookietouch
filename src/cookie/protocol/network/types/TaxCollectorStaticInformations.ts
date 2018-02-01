import GuildInformations from "./GuildInformations";
import Type from "./Type";

export default class TaxCollectorStaticInformations extends Type {
  public firstNameId: number;
  public lastNameId: number;
  public guildIdentity: GuildInformations;

  constructor(firstNameId = 0, lastNameId = 0, guildIdentity: GuildInformations = null) {
    super();
    this.firstNameId = firstNameId;
    this.lastNameId = lastNameId;
    this.guildIdentity = guildIdentity;
  }
}
