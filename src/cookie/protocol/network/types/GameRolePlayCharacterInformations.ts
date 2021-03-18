import ActorAlignmentInformations from "@/protocol/network/types/ActorAlignmentInformations";
import EntityDispositionInformations from "@/protocol/network/types/EntityDispositionInformations";
import EntityLook from "@/protocol/network/types/EntityLook";
import GameRolePlayHumanoidInformations from "@/protocol/network/types/GameRolePlayHumanoidInformations";
import HumanInformations from "@/protocol/network/types/HumanInformations";

export default class GameRolePlayCharacterInformations extends GameRolePlayHumanoidInformations {
  public alignmentInfos: ActorAlignmentInformations;

  constructor(
    contextualId = 0,
    look = new EntityLook(),
    disposition = new EntityDispositionInformations(),
    name: string = "",
    accountId = 0,
    humanoidInfos = new HumanInformations(),
    alignmentInfos = new ActorAlignmentInformations()
  ) {
    super(contextualId, look, disposition, name, accountId, humanoidInfos);
    this.alignmentInfos = alignmentInfos;
  }
}
