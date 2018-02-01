import EntityDispositionInformations from "./EntityDispositionInformations";
import EntityLook from "./EntityLook";
import GameFightAIInformations from "./GameFightAIInformations";
import GameFightMinimalStats from "./GameFightMinimalStats";

export default class GameFightTaxCollectorInformations extends GameFightAIInformations {
  public firstNameId: number;
  public lastNameId: number;
  public level: number;

  constructor(contextualId = 0, look: EntityLook, disposition: EntityDispositionInformations,
              teamId = 2, alive = false, stats: GameFightMinimalStats, firstNameId = 0,
              lastNameId = 0, level = 0) {
    super(contextualId, look, disposition, teamId, alive, stats);
    this.firstNameId = firstNameId;
    this.lastNameId = lastNameId;
    this.level = level;

  }
}
