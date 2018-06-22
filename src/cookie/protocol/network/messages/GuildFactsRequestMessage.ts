import Message from "@/protocol/network/messages/Message";

export default class GuildFactsRequestMessage extends Message {
  public guildId: number;

  constructor(guildId = 0) {
    super();
    this.guildId = guildId;

  }
}
