import Message from "./Message";

export default class GameRolePlayDelayedActionFinishedMessage extends Message {
  public delayedCharacterId: number;
  public delayTypeId: number;

  constructor(delayedCharacterId = 0, delayTypeId = 0) {
    super();
    this.delayedCharacterId = delayedCharacterId;
    this.delayTypeId = delayTypeId;

  }
}
