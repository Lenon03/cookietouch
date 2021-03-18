import EntityDispositionInformations from "@/protocol/network/types/EntityDispositionInformations";
import EntityLook from "@/protocol/network/types/EntityLook";
import GameFightFighterInformations from "@/protocol/network/types/GameFightFighterInformations";
import GameFightMinimalStats from "@/protocol/network/types/GameFightMinimalStats";
import PlayerStatus from "@/protocol/network/types/PlayerStatus";

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
