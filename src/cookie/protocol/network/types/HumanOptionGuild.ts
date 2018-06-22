import GuildInformations from "@/protocol/network/types/GuildInformations";
import HumanOption from "@/protocol/network/types/HumanOption";

export default class HumanOptionGuild extends HumanOption {
  public guildInformations: GuildInformations;

  constructor(guildInformations: GuildInformations = null) {
    super();
    this.guildInformations = guildInformations;

  }
}
