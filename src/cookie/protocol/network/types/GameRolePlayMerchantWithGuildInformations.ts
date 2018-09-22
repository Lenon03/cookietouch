import EntityDispositionInformations from "@/protocol/network/types/EntityDispositionInformations";
import EntityLook from "@/protocol/network/types/EntityLook";
import GameRolePlayMerchantInformations from "@/protocol/network/types/GameRolePlayMerchantInformations";
import GuildInformations from "@/protocol/network/types/GuildInformations";

export default class GameRolePlayMerchantWithGuildInformations extends GameRolePlayMerchantInformations {
  public guildInformations: GuildInformations;

  constructor(
    contextualId = 0,
    look = new EntityLook(),
    disposition = new EntityDispositionInformations(),
    name = "",
    sellType = 0,
    guildInformations = new GuildInformations()
  ) {
    super(contextualId, look, disposition, name, sellType);
    this.guildInformations = guildInformations;
  }
}
