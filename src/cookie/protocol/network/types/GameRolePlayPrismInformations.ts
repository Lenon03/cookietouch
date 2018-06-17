import EntityDispositionInformations from "./EntityDispositionInformations";
import EntityLook from "./EntityLook";
import GameRolePlayActorInformations from "./GameRolePlayActorInformations";
import PrismInformation from "./PrismInformation";

export default class GameRolePlayPrismInformations extends GameRolePlayActorInformations {
  public prism: PrismInformation;

  constructor(contextualId = 0, look: EntityLook, disposition: EntityDispositionInformations,
              prism: PrismInformation) {
    super(contextualId, look, disposition);
    this.prism = prism;

  }
}
