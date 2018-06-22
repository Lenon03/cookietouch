import GuildInformations from "@/protocol/network/types/GuildInformations";
import HouseInformations from "@/protocol/network/types/HouseInformations";

export default class HouseInformationsExtended extends HouseInformations {
  public guildInfo: GuildInformations;

  constructor(houseId = 0, ownerName = "", isOnSale = false,
              isSaleLocked = false, modelId = 0, guildInfo: GuildInformations = null,
              doorsOnMap: number[] = null) {
    super(houseId, ownerName, isOnSale, isSaleLocked, modelId, doorsOnMap);
    this.guildInfo = guildInfo;

  }
}
