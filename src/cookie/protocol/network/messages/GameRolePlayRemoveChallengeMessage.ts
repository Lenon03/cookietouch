import Message from "./Message";
export default class GameRolePlayRemoveChallengeMessage extends Message {
  public fightId: number;
  constructor(fightId = 0) {
    super();
    this.fightId = fightId;

  }
}
