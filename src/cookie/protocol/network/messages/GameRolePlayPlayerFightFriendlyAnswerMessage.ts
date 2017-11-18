import Message from "./Message";
export default class GameRolePlayPlayerFightFriendlyAnswerMessage extends Message {
  public fightId: number;
  public accept: boolean;
  constructor(fightId = 0, accept = false) {
    super();
    this.fightId = fightId;
    this.accept = accept;

  }
}
