import GameRolePlayDelayedActionMessage from "./GameRolePlayDelayedActionMessage";
export default class GameRolePlayDelayedObjectUseMessage extends GameRolePlayDelayedActionMessage {
  public objectGID: number;
  constructor(delayedCharacterId = 0, delayTypeId = 0, delayEndTime = 0, objectGID = 0) {
    super(delayedCharacterId, delayTypeId, delayEndTime);
    this.objectGID = objectGID;

  }
}
