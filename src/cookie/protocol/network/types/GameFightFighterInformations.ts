import EntityDispositionInformations from "./EntityDispositionInformations";
import EntityLook from "./EntityLook";
import GameContextActorInformations from "./GameContextActorInformations";
import GameFightMinimalStats from "./GameFightMinimalStats";

export default class GameFightFighterInformations extends GameContextActorInformations {
  public teamId: number;
  public alive: boolean;
  public stats: GameFightMinimalStats;
  constructor(contextualId = 0, look: EntityLook, disposition: EntityDispositionInformations,
              teamId = 2, alive = false, stats: GameFightMinimalStats) {
    super(contextualId, look, disposition);
    this.teamId = teamId;
    this.alive = alive;
    this.stats = stats;

  }
}
