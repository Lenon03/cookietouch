import EntityDispositionInformations from "./EntityDispositionInformations";
import EntityLook from "./EntityLook";
import GameFightFighterInformations from "./GameFightFighterInformations";
import GameFightMinimalStats from "./GameFightMinimalStats";

export default class GameFightAIInformations extends GameFightFighterInformations {
  constructor(contextualId = 0, look: EntityLook, disposition: EntityDispositionInformations,
              teamId = 2, alive = false, stats: GameFightMinimalStats) {
    super(contextualId, look, disposition, teamId, alive, stats);
  }
}
