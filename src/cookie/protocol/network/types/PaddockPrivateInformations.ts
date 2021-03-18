import GuildInformations from "@/protocol/network/types/GuildInformations";
import PaddockAbandonnedInformations from "@/protocol/network/types/PaddockAbandonnedInformations";

export default class PaddockPrivateInformations extends PaddockAbandonnedInformations {
  public guildInfo: GuildInformations;

  constructor(
    maxOutdoorMount = 0,
    maxItems = 0,
    price = 0,
    locked = false,
    guildId = 0,
    guildInfo = new GuildInformations()
  ) {
    super(maxOutdoorMount, maxItems, price, locked, guildId);
    this.guildInfo = guildInfo;
  }
}
