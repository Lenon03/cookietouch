import EntityDispositionInformations from "./EntityDispositionInformations";
import EntityLook from "./EntityLook";
import GameRolePlayNamedActorInformations from "./GameRolePlayNamedActorInformations";
import HumanOption from "./HumanOption";

export default class GameRolePlayMerchantInformations extends GameRolePlayNamedActorInformations {
  public options: HumanOption[];
  public sellType: number;

  constructor(contextualId = 0, look: EntityLook, disposition: EntityDispositionInformations,
              name = "", sellType = 0, options: HumanOption[] = null) {
    super(contextualId, look, disposition, name);
    this.options = options;
    this.sellType = sellType;

  }
}
