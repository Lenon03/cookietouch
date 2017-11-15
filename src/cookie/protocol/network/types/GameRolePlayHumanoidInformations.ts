import EntityDispositionInformations from "./EntityDispositionInformations";
import EntityLook from "./EntityLook";
import GameRolePlayNamedActorInformations from "./GameRolePlayNamedActorInformations";
import HumanInformations from "./HumanInformations";

export default class GameRolePlayHumanoidInformations extends GameRolePlayNamedActorInformations {
  public humanoidInfo: HumanInformations;
  public accountId: number;

  constructor(contextualId = 0, look: EntityLook = null,
              disposition: EntityDispositionInformations = null,
              name: string = "", accountId = 0, humanoidInfos: HumanInformations = null) {
    super(contextualId, look, disposition, name);
    this.accountId = accountId;
    this.humanoidInfo = humanoidInfos;
  }
}
