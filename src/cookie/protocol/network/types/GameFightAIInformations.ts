import EntityDispositionInformations from "@/protocol/network/types/EntityDispositionInformations";
import EntityLook from "@/protocol/network/types/EntityLook";
import GameFightFighterInformations from "@/protocol/network/types/GameFightFighterInformations";
import GameFightMinimalStats from "@/protocol/network/types/GameFightMinimalStats";

export default class GameFightAIInformations extends GameFightFighterInformations {
  constructor(contextualId = 0, look: EntityLook, disposition: EntityDispositionInformations,
              teamId = 2, alive = false, stats: GameFightMinimalStats) {
    super(contextualId, look, disposition, teamId, alive, stats);
  }
}
