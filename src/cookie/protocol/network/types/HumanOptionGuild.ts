import GuildInformations from "./GuildInformations";
import HumanOption from "./HumanOption";

export default class HumanOptionGuild extends HumanOption {
  public guildInformations: GuildInformations;

  constructor(guildInformations: GuildInformations = null) {
    super();
    this.guildInformations = guildInformations;

  }
}
