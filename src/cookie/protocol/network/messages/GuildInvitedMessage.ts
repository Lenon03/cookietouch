import BasicGuildInformations from "@/protocol/network/types/BasicGuildInformations";
import Message from "@/protocol/network/messages/Message";

export default class GuildInvitedMessage extends Message {
  public recruterId: number;
  public recruterName: string;
  public guildInfo: BasicGuildInformations;

  constructor(recruterId = 0, recruterName = "", guildInfo: BasicGuildInformations) {
    super();
    this.recruterId = recruterId;
    this.recruterName = recruterName;
    this.guildInfo = guildInfo;

  }
}
