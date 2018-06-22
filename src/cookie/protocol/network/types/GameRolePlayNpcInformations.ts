import EntityDispositionInformations from "@/protocol/network/types/EntityDispositionInformations";
import EntityLook from "@/protocol/network/types/EntityLook";
import GameRolePlayActorInformations from "@/protocol/network/types/GameRolePlayActorInformations";

export default class GameRolePlayNpcInformations extends GameRolePlayActorInformations {
  public npcId: number;
  public sex: boolean;
  public specialArtworkId: number;

  constructor(contextualId = 0, look: EntityLook = null, disposition: EntityDispositionInformations = null,
              npcId = 0, sex = false, specialArtworkId = 0) {
    super(contextualId, look, disposition);
    this.npcId = npcId;
    this.sex = sex;
    this.specialArtworkId = specialArtworkId;
  }
}
