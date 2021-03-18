import AbstractGameActionMessage from "@/protocol/network/messages/AbstractGameActionMessage";

export default class GameActionFightDispellMessage extends AbstractGameActionMessage {
  public targetId: number;

  constructor(actionId = 0, sourceId = 0, targetId = 0) {
    super(actionId, sourceId);
    this.targetId = targetId;

  }
}
