import AbstractGameActionMessage from "@/protocol/network/messages/AbstractGameActionMessage";

export default class AbstractGameActionFightTargetedAbilityMessage extends AbstractGameActionMessage {
  public targetId: number;
  public destinationCellId: number;
  public critical: number;
  public silentCast: boolean;

  constructor(actionId = 0, sourceId = 0, targetId = 0, destinationCellId = 0, critical = 1, silentCast = false) {
    super();
    this.targetId = targetId;
    this.destinationCellId = destinationCellId;
    this.critical = critical;
    this.silentCast = silentCast;
  }
}
