import EntityDispositionInformations from "./EntityDispositionInformations";
import EntityLook from "./EntityLook";
import GameRolePlayMerchantInformations from "./GameRolePlayMerchantInformations";
import GuildInformations from "./GuildInformations";

export default class GameRolePlayMerchantWithGuildInformations extends GameRolePlayMerchantInformations {
  public guildInformations: GuildInformations;

  constructor(contextualId = 0, look: EntityLook, disposition: EntityDispositionInformations,
              name = "", sellType = 0, guildInformations: GuildInformations) {
    super(contextualId, look, disposition, name, sellType);
    this.guildInformations = guildInformations;
  }
}
