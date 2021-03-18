import EntityDispositionInformations from "@/protocol/network/types/EntityDispositionInformations";
import EntityLook from "@/protocol/network/types/EntityLook";
import GameRolePlayActorInformations from "@/protocol/network/types/GameRolePlayActorInformations";
import PrismInformation from "@/protocol/network/types/PrismInformation";

export default class GameRolePlayPrismInformations extends GameRolePlayActorInformations {
  public prism: PrismInformation;

  constructor(
    contextualId = 0,
    look = new EntityLook(),
    disposition = new EntityDispositionInformations(),
    prism = new PrismInformation()
  ) {
    super(contextualId, look, disposition);
    this.prism = prism;
  }
}
