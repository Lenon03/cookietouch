import EntityDispositionInformations from "@/protocol/network/types/EntityDispositionInformations";
import EntityLook from "@/protocol/network/types/EntityLook";
import GameRolePlayActorInformations from "@/protocol/network/types/GameRolePlayActorInformations";
import TaxCollectorStaticInformations from "@/protocol/network/types/TaxCollectorStaticInformations";

export default class GameRolePlayTaxCollectorInformations extends GameRolePlayActorInformations {
  public identification: TaxCollectorStaticInformations;
  public guildLevel: number;
  public taxCollectorAttack: number;

  constructor(
    contextualId = 0,
    look = new EntityLook(),
    disposition = new EntityDispositionInformations(),
    identification = new TaxCollectorStaticInformations(),
    guildLevel = 0,
    taxCollectorAttack = 0
  ) {
    super(contextualId, look, disposition);
    this.identification = identification;
    this.guildLevel = guildLevel;
    this.taxCollectorAttack = taxCollectorAttack;
  }
}
