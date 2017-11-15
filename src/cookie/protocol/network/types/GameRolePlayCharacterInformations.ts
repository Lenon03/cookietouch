import ActorAlignmentInformations from "./ActorAlignmentInformations";
import EntityDispositionInformations from "./EntityDispositionInformations";
import EntityLook from "./EntityLook";
import GameRolePlayHumanoidInformations from "./GameRolePlayHumanoidInformations";
import HumanInformations from "./HumanInformations";

export default class GameRolePlayCharacterInformations extends GameRolePlayHumanoidInformations {
    public alignmentInfos: ActorAlignmentInformations;

    constructor(contextualId = 0, look: EntityLook = null,
                disposition: EntityDispositionInformations = null,
                name: string = "", accountId = 0, humanoidInfos: HumanInformations = null,
                alignmentInfos: ActorAlignmentInformations = null) {
      super(contextualId, look, disposition, name, accountId);
      this.humanoidInfo = humanoidInfos;
    }
}
