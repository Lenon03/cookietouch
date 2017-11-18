import EntityDispositionInformations from "./EntityDispositionInformations";
import EntityLook from "./EntityLook";
import GameFightFighterNamedInformations from "./GameFightFighterNamedInformations";
import GameFightMinimalStats from "./GameFightMinimalStats";
import PlayerStatus from "./PlayerStatus";
export default class GameFightMutantInformations extends GameFightFighterNamedInformations {
  public powerLevel: number;
  constructor(contextualId = 0, look: EntityLook, disposition: EntityDispositionInformations,
              teamId = 2, alive = false, stats: GameFightMinimalStats, name = "",
              status: PlayerStatus, powerLevel = 0) {
    super(contextualId, look, disposition, teamId, alive, stats, name, status);
    this.powerLevel = powerLevel;

  }
}
