import EntityDispositionInformations from "@/protocol/network/types/EntityDispositionInformations";
import EntityLook from "@/protocol/network/types/EntityLook";
import GameRolePlayNamedActorInformations from "@/protocol/network/types/GameRolePlayNamedActorInformations";

export default class GameRolePlayMountInformations extends GameRolePlayNamedActorInformations {
  public ownerName: string;
  public level: number;

  constructor(contextualId = 0, look: EntityLook, disposition: EntityDispositionInformations,
              name = "", ownerName = "", level = 0) {
    super(contextualId, look, disposition, name);
    this.ownerName = ownerName;
    this.level = level;

  }
}
