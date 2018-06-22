import Message from "@/protocol/network/messages/Message";
import GuildInformations from "@/protocol/network/types/GuildInformations";

export default class HouseGuildRightsMessage extends Message {
  public houseId: number;
  public guildInfo: GuildInformations;
  public rights: number;

  constructor(houseId = 0, guildInfo: GuildInformations, rights = 0) {
    super();
    this.houseId = houseId;
    this.guildInfo = guildInfo;
    this.rights = rights;

  }
}
