import EntityDispositionInformations from "@/protocol/network/types/EntityDispositionInformations";
import EntityLook from "@/protocol/network/types/EntityLook";
import GameRolePlayHumanoidInformations from "@/protocol/network/types/GameRolePlayHumanoidInformations";
import HumanInformations from "@/protocol/network/types/HumanInformations";

export default class GameRolePlayMutantInformations extends GameRolePlayHumanoidInformations {
  public monsterId: number;
  public powerLevel: number;

  constructor(contextualId = 0, look: EntityLook = null,
              disposition: EntityDispositionInformations = null, name = "",
              humanoidInfo: HumanInformations = null, accountId = 0, monsterId = 0, powerLevel = 0) {
    super(contextualId, look, disposition, name, accountId, humanoidInfo);
    this.monsterId = monsterId;
    this.powerLevel = powerLevel;

  }
}
