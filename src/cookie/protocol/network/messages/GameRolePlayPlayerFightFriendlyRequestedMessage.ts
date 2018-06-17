import Message from "./Message";

export default class GameRolePlayPlayerFightFriendlyRequestedMessage extends Message {
  public fightId: number;
  public sourceId: number;
  public targetId: number;

  constructor(fightId = 0, sourceId = 0, targetId = 0) {
    super();
    this.fightId = fightId;
    this.sourceId = sourceId;
    this.targetId = targetId;

  }
}
