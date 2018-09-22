import GuildInformations from "@/protocol/network/types/GuildInformations";
import Type from "@/protocol/network/types/Type";

export default class TaxCollectorStaticInformations extends Type {
  public firstNameId: number;
  public lastNameId: number;
  public guildIdentity: GuildInformations;

  constructor(
    firstNameId = 0,
    lastNameId = 0,
    guildIdentity = new GuildInformations()
  ) {
    super();
    this.firstNameId = firstNameId;
    this.lastNameId = lastNameId;
    this.guildIdentity = guildIdentity;
  }
}
