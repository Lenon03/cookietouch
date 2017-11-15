import EntityDispositionInformations from "./EntityDispositionInformations";
import EntityLook from "./EntityLook";
import GameRolePlayActorInformations from "./GameRolePlayActorInformations";

export default class GameRolePlayNamedActorInformations extends GameRolePlayActorInformations {
  public name: string;

  constructor(contextualId = 0, look: EntityLook = null,
              disposition: EntityDispositionInformations = null, name: string = "") {
    super(contextualId, look, disposition);
    this.name = name;
  }
}
