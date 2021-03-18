import AbstractGameActionMessage from "@/protocol/network/messages/AbstractGameActionMessage";

export default class GameActionFightTackledMessage extends AbstractGameActionMessage {
  public tacklersIds: number[];

  constructor(actionId = 0, sourceId = 0, tacklersIds: number[]) {
    super(actionId, sourceId);
    this.tacklersIds = tacklersIds;

  }
}
