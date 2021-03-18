import Message from "@/protocol/network/messages/Message";

export default class GameActionFightCastOnTargetRequestMessage extends Message {
  public spellId: number;
  public targetId: number;

  constructor(spellId = 0, targetId = 0) {
    super();
    this.spellId = spellId;
    this.targetId = targetId;

  }
}
