import AbstractGameActionMessage from "@/protocol/network/messages/AbstractGameActionMessage";
import EntityLook from "@/protocol/network/types/EntityLook";

export default class GameActionFightChangeLookMessage extends AbstractGameActionMessage {
  public targetId: number;
  public entityLook: EntityLook;

  constructor(actionId = 0, sourceId = 0, targetId = 0, entityLook: EntityLook) {
    super(actionId, sourceId);
    this.targetId = targetId;
    this.entityLook = entityLook;

  }
}
