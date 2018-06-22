import EntityDispositionInformations from "@/protocol/network/types/EntityDispositionInformations";
import EntityLook from "@/protocol/network/types/EntityLook";
import GameRolePlayActorInformations from "@/protocol/network/types/GameRolePlayActorInformations";

export default class GameRolePlayNamedActorInformations extends GameRolePlayActorInformations {
  public name: string;

  constructor(contextualId = 0, look: EntityLook = null,
              disposition: EntityDispositionInformations = null, name: string = "") {
    super(contextualId, look, disposition);
    this.name = name;
  }
}
