import EntityDispositionInformations from "./EntityDispositionInformations";
import EntityLook from "./EntityLook";
import GameRolePlayActorInformations from "./GameRolePlayActorInformations";
import TaxCollectorStaticInformations from "./TaxCollectorStaticInformations";

export default class GameRolePlayTaxCollectorInformations extends GameRolePlayActorInformations {
  public identification: TaxCollectorStaticInformations;
  public guildLevel: number;
  public taxCollectorAttack: number;

  constructor(contextualId = 0, look: EntityLook = null, disposition: EntityDispositionInformations = null,
              identification: TaxCollectorStaticInformations, guildLevel = 0, taxCollectorAttack = 0) {
    super(contextualId, look, disposition);
    this.identification = identification;
    this.guildLevel = guildLevel;
    this.taxCollectorAttack = taxCollectorAttack;

  }
}
