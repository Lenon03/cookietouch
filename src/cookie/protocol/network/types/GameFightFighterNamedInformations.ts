import EntityDispositionInformations from "./EntityDispositionInformations";
import EntityLook from "./EntityLook";
import GameFightFighterInformations from "./GameFightFighterInformations";
import GameFightMinimalStats from "./GameFightMinimalStats";
import PlayerStatus from "./PlayerStatus";
export default class GameFightFighterNamedInformations extends GameFightFighterInformations {
  public name: string;
  public status: PlayerStatus;
  constructor(contextualId = 0, look: EntityLook,
              disposition: EntityDispositionInformations,
              teamId = 2, alive = false, stats: GameFightMinimalStats,
              name = "", status: PlayerStatus) {
    super(contextualId, look, disposition, teamId, alive, stats);
    this.name = name;
    this.status = status;

  }
}
