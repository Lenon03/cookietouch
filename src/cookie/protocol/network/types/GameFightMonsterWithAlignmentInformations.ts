import ActorAlignmentInformations from "./ActorAlignmentInformations";
import EntityDispositionInformations from "./EntityDispositionInformations";
import EntityLook from "./EntityLook";
import GameFightMinimalStats from "./GameFightMinimalStats";
import GameFightMonsterInformations from "./GameFightMonsterInformations";

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
