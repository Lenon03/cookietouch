import AllianceInformations from "@/protocol/network/types/AllianceInformations";
import GuildInformations from "@/protocol/network/types/GuildInformations";
import TaxCollectorStaticInformations from "@/protocol/network/types/TaxCollectorStaticInformations";

export default class TaxCollectorStaticExtendedInformations extends TaxCollectorStaticInformations {
  public allianceIdentity: AllianceInformations;

  constructor(
    firstNameId = 0,
    lastNameId = 0,
    guildIdentity = new GuildInformations(),
    allianceIdentity = new AllianceInformations()
  ) {
    super(firstNameId, lastNameId, guildIdentity);
    this.allianceIdentity = allianceIdentity;
  }
}
