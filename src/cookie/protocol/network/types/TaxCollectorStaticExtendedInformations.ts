import AllianceInformations from "./AllianceInformations";
import GuildInformations from "./GuildInformations";
import TaxCollectorStaticInformations from "./TaxCollectorStaticInformations";
export default class TaxCollectorStaticExtendedInformations extends TaxCollectorStaticInformations {
  public allianceIdentity: AllianceInformations;
  constructor(firstNameId = 0, lastNameId = 0, guildIdentity: GuildInformations = null,
              allianceIdentity: AllianceInformations = null) {
    super(firstNameId, lastNameId, guildIdentity);
    this.allianceIdentity = allianceIdentity;

  }
}
