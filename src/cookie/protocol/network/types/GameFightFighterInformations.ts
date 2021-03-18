import EntityDispositionInformations from "@/protocol/network/types/EntityDispositionInformations";
import EntityLook from "@/protocol/network/types/EntityLook";
import GameContextActorInformations from "@/protocol/network/types/GameContextActorInformations";
import GameFightMinimalStats from "@/protocol/network/types/GameFightMinimalStats";

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
