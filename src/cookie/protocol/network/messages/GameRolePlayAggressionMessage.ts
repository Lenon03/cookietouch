import Message from "./Message";

export default class GameRolePlayAggressionMessage extends Message {
  public attackerId: number;
  public defenderId: number;

  constructor(attackerId = 0, defenderId = 0) {
    super();
    this.attackerId = attackerId;
    this.defenderId = defenderId;

  }
}
