import Message from "@/protocol/network/messages/Message";
import GuildVersatileInformations from "@/protocol/network/types/GuildVersatileInformations";

export default class GuildVersatileInfoListMessage extends Message {
  public guilds: GuildVersatileInformations[];

  constructor(guilds: GuildVersatileInformations[]) {
    super();
    this.guilds = guilds;

  }
}
