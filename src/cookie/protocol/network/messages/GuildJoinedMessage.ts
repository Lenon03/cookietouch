import GuildInformations from "@protocol/network/types/GuildInformations";
import Message from "./Message";

export default class GuildJoinedMessage extends Message {
  public guildInfo: GuildInformations;
  public memberRights: number;
  public enabled: boolean;

  constructor(guildInfo: GuildInformations, memberRights = 0, enabled = false) {
    super();
    this.guildInfo = guildInfo;
    this.memberRights = memberRights;
    this.enabled = enabled;

  }
}
