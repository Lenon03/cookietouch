import GuildInformations from "@protocol/network/types/GuildInformations";
import GuildJoinedMessage from "./GuildJoinedMessage";

export default class GuildMembershipMessage extends GuildJoinedMessage {
  constructor(guildInfo: GuildInformations, memberRights = 0, enabled = false) {
    super(guildInfo, memberRights, enabled);

  }
}
