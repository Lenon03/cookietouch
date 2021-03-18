import GuildJoinedMessage from "@/protocol/network/messages/GuildJoinedMessage";
import GuildInformations from "@/protocol/network/types/GuildInformations";

export default class GuildMembershipMessage extends GuildJoinedMessage {
  constructor(guildInfo: GuildInformations, memberRights = 0, enabled = false) {
    super(guildInfo, memberRights, enabled);

  }
}
