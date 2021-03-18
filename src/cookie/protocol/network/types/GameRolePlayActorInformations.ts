import EntityDispositionInformations from "@/protocol/network/types/EntityDispositionInformations";
import EntityLook from "@/protocol/network/types/EntityLook";
import GameContextActorInformations from "@/protocol/network/types/GameContextActorInformations";

export default class GameRolePlayActorInformations extends GameContextActorInformations {
  constructor(
    contextualId = 0,
    look = new EntityLook(),
    disposition = new EntityDispositionInformations()
  ) {
    super(contextualId, look, disposition);
  }
}
