import ActorAlignmentInformations from "./ActorAlignmentInformations";
import EntityDispositionInformations from "./EntityDispositionInformations";
import EntityLook from "./EntityLook";
import GameFightFighterNamedInformations from "./GameFightFighterNamedInformations";
import GameFightMinimalStats from "./GameFightMinimalStats";
import PlayerStatus from "./PlayerStatus";
export default class GameFightCharacterInformations extends GameFightFighterNamedInformations {
  public level: number;
  public alignmentInfos: ActorAlignmentInformations;
  public breed: number;
  constructor(contextualId = 0, look: EntityLook,
              disposition: EntityDispositionInformations, teamId = 2,
              alive = false, stats: GameFightMinimalStats , name = "",
              status: PlayerStatus, level = 0, alignmentInfos: ActorAlignmentInformations,
              breed = 0) {
    super(contextualId, look, disposition, teamId, alive, stats, name, status);
    this.level = level;
    this.alignmentInfos = alignmentInfos;
    this.breed = breed;

  }
}
