import EntityDispositionInformations from "./EntityDispositionInformations";
import EntityLook from "./EntityLook";
import GameRolePlayActorInformations from "./GameRolePlayActorInformations";

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
