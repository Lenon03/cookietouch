import EntityDispositionInformations from "./EntityDispositionInformations";
import EntityLook from "./EntityLook";
import GameFightAIInformations from "./GameFightAIInformations";
import GameFightMinimalStats from "./GameFightMinimalStats";

export default class GameFightMonsterInformations extends GameFightAIInformations {
  public creatureGenericId: number;
  public creatureGrade: number;

  constructor(contextualId = 0, look: EntityLook, disposition: EntityDispositionInformations,
              teamId = 2, alive = false, stats: GameFightMinimalStats,
              creatureGenericId = 0, creatureGrade = 0) {
    super(contextualId, look, disposition, teamId, alive, stats);
    this.creatureGenericId = creatureGenericId;
    this.creatureGrade = creatureGrade;

  }
}
