import Message from "@/protocol/network/messages/Message";
import GuildInformations from "@/protocol/network/types/GuildInformations";

export default class GuildListMessage extends Message {
  public guilds: GuildInformations[];

  constructor(guilds: GuildInformations[]) {
    super();
    this.guilds = guilds;

  }
}
