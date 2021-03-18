import EntityDispositionInformations from "@/protocol/network/types/EntityDispositionInformations";
import EntityLook from "@/protocol/network/types/EntityLook";
import GameFightFighterNamedInformations from "@/protocol/network/types/GameFightFighterNamedInformations";
import GameFightMinimalStats from "@/protocol/network/types/GameFightMinimalStats";
import PlayerStatus from "@/protocol/network/types/PlayerStatus";

export default class GameFightMutantInformations extends GameFightFighterNamedInformations {
  public powerLevel: number;

  constructor(contextualId = 0, look: EntityLook, disposition: EntityDispositionInformations,
              teamId = 2, alive = false, stats: GameFightMinimalStats, name = "",
              status: PlayerStatus, powerLevel = 0) {
    super(contextualId, look, disposition, teamId, alive, stats, name, status);
    this.powerLevel = powerLevel;

  }
}
