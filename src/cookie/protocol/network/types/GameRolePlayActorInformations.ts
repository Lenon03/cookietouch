import EntityDispositionInformations from "./EntityDispositionInformations";
import EntityLook from "./EntityLook";
import GameContextActorInformations from "./GameContextActorInformations";

export default class GameRolePlayActorInformations extends GameContextActorInformations {
  constructor(contextualId = 0, look: EntityLook = null, disposition: EntityDispositionInformations = null) {
    super(contextualId, look, disposition);
  }
}
