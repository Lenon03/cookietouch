import Message from "@/protocol/network/messages/Message";

export default class GameRolePlayDelayedActionMessage extends Message {
  public delayedCharacterId: number;
  public delayTypeId: number;
  public delayEndTime: number;

  constructor(delayedCharacterId = 0, delayTypeId = 0, delayEndTime = 0) {
    super();
    this.delayedCharacterId = delayedCharacterId;
    this.delayTypeId = delayTypeId;
    this.delayEndTime = delayEndTime;

  }
}
