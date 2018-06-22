import ActorAlignmentInformations from "@/protocol/network/types/ActorAlignmentInformations";
import EntityDispositionInformations from "@/protocol/network/types/EntityDispositionInformations";
import EntityLook from "@/protocol/network/types/EntityLook";
import GameFightFighterNamedInformations from "@/protocol/network/types/GameFightFighterNamedInformations";
import GameFightMinimalStats from "@/protocol/network/types/GameFightMinimalStats";
import PlayerStatus from "@/protocol/network/types/PlayerStatus";

export default class GameFightCharacterInformations extends GameFightFighterNamedInformations {
  public level: number;
  public alignmentInfos: ActorAlignmentInformations;
  public breed: number;

  constructor(contextualId = 0, look: EntityLook,
              disposition: EntityDispositionInformations, teamId = 2,
              alive = false, stats: GameFightMinimalStats, name = "",
              status: PlayerStatus, level = 0, alignmentInfos: ActorAlignmentInformations,
              breed = 0) {
    super(contextualId, look, disposition, teamId, alive, stats, name, status);
    this.level = level;
    this.alignmentInfos = alignmentInfos;
    this.breed = breed;

  }
}
