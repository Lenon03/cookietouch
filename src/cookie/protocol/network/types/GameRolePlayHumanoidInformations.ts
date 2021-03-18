import EntityDispositionInformations from "@/protocol/network/types/EntityDispositionInformations";
import EntityLook from "@/protocol/network/types/EntityLook";
import GameRolePlayNamedActorInformations from "@/protocol/network/types/GameRolePlayNamedActorInformations";
import HumanInformations from "@/protocol/network/types/HumanInformations";

export default class GameRolePlayHumanoidInformations extends GameRolePlayNamedActorInformations {
  public humanoidInfo: HumanInformations;
  public accountId: number;

  constructor(
    contextualId = 0,
    look = new EntityLook(),
    disposition = new EntityDispositionInformations(),
    name: string = "",
    accountId = 0,
    humanoidInfos = new HumanInformations()
  ) {
    super(contextualId, look, disposition, name);
    this.accountId = accountId;
    this.humanoidInfo = humanoidInfos;
  }
}
