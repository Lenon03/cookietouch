import EntityDispositionInformations from "@/protocol/network/types/EntityDispositionInformations";
import EntityLook from "@/protocol/network/types/EntityLook";
import GameFightFighterInformations from "@/protocol/network/types/GameFightFighterInformations";
import GameFightMinimalStats from "@/protocol/network/types/GameFightMinimalStats";

export default class GameFightCompanionInformations extends GameFightFighterInformations {
  public companionGenericId: number;
  public level: number;
  public masterId: number;

  constructor(contextualId = 0, look: EntityLook, disposition: EntityDispositionInformations,
              teamId = 2, alive = false, stats: GameFightMinimalStats,
              companionGenericId = 0, level = 0, masterId = 0) {
    super(contextualId, look, disposition, teamId, alive, stats);
    this.companionGenericId = companionGenericId;
    this.level = level;
    this.masterId = masterId;

  }
}
