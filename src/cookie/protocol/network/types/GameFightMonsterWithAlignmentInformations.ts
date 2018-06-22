import ActorAlignmentInformations from "@/protocol/network/types/ActorAlignmentInformations";
import EntityDispositionInformations from "@/protocol/network/types/EntityDispositionInformations";
import EntityLook from "@/protocol/network/types/EntityLook";
import GameFightMinimalStats from "@/protocol/network/types/GameFightMinimalStats";
import GameFightMonsterInformations from "@/protocol/network/types/GameFightMonsterInformations";

export default class GameFightMonsterWithAlignmentInformations extends GameFightMonsterInformations {
  public alignmentInfos: ActorAlignmentInformations;

  constructor(contextualId = 0, look: EntityLook,
              disposition: EntityDispositionInformations, teamId = 2, alive = false,
              stats: GameFightMinimalStats, creatureGenericId = 0, creatureGrade = 0,
              alignmentInfos: ActorAlignmentInformations) {
    super(contextualId, look, disposition, teamId, alive, stats, creatureGenericId, creatureGrade);
    this.alignmentInfos = alignmentInfos;

  }
}
