import FightCommonInformations from "@/protocol/network/types/FightCommonInformations";
import Message from "@/protocol/network/messages/Message";

export default class GameRolePlayShowChallengeMessage extends Message {
  public commonsInfos: FightCommonInformations;

  constructor(commonsInfos: FightCommonInformations) {
    super();
    this.commonsInfos = commonsInfos;

  }
}
