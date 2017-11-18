import Message from "./Message";
export default class GameRolePlayPlayerFightFriendlyAnsweredMessage extends Message {
  public fightId: number;
  public sourceId: number;
  public targetId: number;
  public accept: boolean;
  constructor(fightId = 0, sourceId = 0, targetId = 0, accept = false) {
    super();
    this.fightId = fightId;
    this.sourceId = sourceId;
    this.targetId = targetId;
    this.accept = accept;

  }
}
