import Message from "./Message";

export default class GameRolePlayPlayerFightRequestMessage extends Message {
  public targetId: number;
  public targetCellId: number;
  public friendly: boolean;

  constructor(targetId = 0, targetCellId = 0, friendly = false) {
    super();
    this.targetId = targetId;
    this.targetCellId = targetCellId;
    this.friendly = friendly;

  }
}
